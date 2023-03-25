import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js"

/* Register user */

export const register = async (req: any, res:any) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random()*10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch(err){
        res.status(500).json({ error: (err as Error).message})
    }
}

/* Loging in */

export const Login =async (req:any, res:any) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email})

        if (!user) return res.status(400).json({ msg: "User does not exist."})

        const isMatch = await bcrypt.compare(password, user.password!)
        if (!isMatch) return res.status(400).json({ msg: "Invalid password."})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
        delete user.password

        res.status(201).json({token, user})

    } catch(err){
        res.status(500).json({ error: (err as Error).message})
    }
}