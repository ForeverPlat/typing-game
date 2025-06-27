import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        //  check if username/ email is already in the db
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        
        if (userExists){
            return res.status(409).json({ msg: `This user already exists` });
        }

        if (!username || !email || !password) {
            return res.status(404).json({ msg: `All fields need to be filled` });
        }

        //  encrypt password before sending to db
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();

        // create user token using JsonWebToken (jwt)
        // ---> THIS MIGHT CAUSE ISSUE DO TESTING
        const token = jwt.sign({
            userId: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const safeUser = { username: newUser.username }; //  this is called masking the response
        return res.json({
            success: true,
            message: 'Signup Successful',
            data: {
                token,
                user: safeUser
            }
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'An error occurred, please try again.'});
        
    }

}

export const login = async (req, res) => {
 
    try {
        
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        //  check if all fields are filled
        if (!username || !password) {
            return res.status(400).json({ msg: `All fields need to be filled` });
        } 
        
        if (!user) {
            return res.status(404).json({ msg: `User not found.` });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(401).json({ msg: `Incorrect Password` });
        }

        // create user token using JsonWebToken (jwt)
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const safeUser = { username: user.username }; //  this is called masking the response

        return res.json({
            success: true,
            message: 'Login Successful',
            data: {
                token,
                user: safeUser
            }
        });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'An error occurred, please try again.'});

    }

}