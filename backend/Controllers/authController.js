import express from 'express';
import User from '../Models/User.js';
import bcrypt from 'bcryptjs';

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

        const safeUser = { username: newUser.username }; //  this is called masking the response
        return res.json({ message: 'Signup Successful', user: safeUser });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'An error occurred, please try again.'});
        
    }

}

export const login = async (req, res) => {

    const { username, password } = req.body;
 
    try {
        
        const user = await User.findOne({ username })

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

        const safeUser = { username: user.username }; //  this is called masking the response
        return res.json({ message: 'Login Successful', user: safeUser });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'An error occurred, please try again.'});

    }

}