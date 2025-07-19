import User from '../Models/User.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';

export const signup = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        //  check if username/ email is already in the db
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        
        if (userExists && userExists.verified){
            return next(createError('This user already exists.', 409));
        }

        if (!username || !email || !password) {
            return next(createError('All fields need to be filled', 400));
        }

        //  encrypt password before sending to db
        const hashedPassword = await bcrypt.hash(password, 10);

        // create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        // Set expiration time: 1 hour from now
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires: expiresAt,
            role: 'user'
        });

        await newUser.save();

        await sendVerificationEmail(newUser);
        
        // // create user token using JsonWebToken (jwt)
        // // ---> THIS MIGHT CAUSE ISSUE DO TESTING
        // const token = jwt.sign({
        //     userId: newUser._id,
        //     username: newUser.username,
        //     email: newUser.email,
        //     role: newUser.role,
        //     verified: newUser.verified
        // }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES_IN
        // });

        const safeUser = { username: newUser.username }; //  this is called masking the response
        return res.json({
            success: true,
            message: 'Signup Successful',
            data: {
                // token,
                user: safeUser
            }
        });
    } catch (err) {

        next(err);
    }

}

export const login = async (req, res, next) => {
 
    try {
        
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        //  check if all fields are filled
        if (!username || !password) {
            return next(createError('All fields need to be filled', 400));
        } 
        
        if (!user) {
            return next(createError('User not found.', 404));
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return next(createError('Incorrect Password', 401));
        }

        if (!user.verified) {
            // If expired or not set, generate a new token
            const now = new Date();
            if (!user.verificationToken || user.verificationTokenExpires < now) {
                user.verificationToken = crypto.randomBytes(32).toString('hex');
                user.verificationTokenExpires = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
                await user.save();
                await sendVerificationEmail(user);

                return next(createError('Email not verified. Verification email sent.', 403));
            }

            return next(createError('Email not verified. Please check your inbox.', 403));
        }

        // create user token using JsonWebToken (jwt)
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            verified: user.verified
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const safeUser = { username: user.username }; //  this is called masking the response

        return res.json({
            success: true,
            message: 'Login Successful',
            data: {
                token,
                verified: user.verified,
                user: safeUser
            }
        });

    } catch (err) {
        
        next(err);
    }

}