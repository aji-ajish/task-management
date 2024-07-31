import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {rm} from "fs"
import { User } from '../models/User.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;
        const image = req.file

        if (req.user.role != 'admin') {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        // check email already exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User Email Already Exists"
            })
        }

        // convert password to hash
        const hashPassword = await bcrypt.hash(password, 10)

        // create new user
        const insertUserDetails = await User.create({
            name,
            email,
            phone,
            address,
            password: hashPassword,
            image:image?.path
        })
        // exclude the password field before sending
        const { password: userPassword, ...newUser } = insertUserDetails.toObject()

        return res.status(200).json({
            message: "User Registration Success",
            user: newUser
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check user email address
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({
                message: "Invalid Credentials"
            })
        }
        // password check
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.status(500).json({
                message: "Invalid Credentials"
            })
        }

        // generate sign in token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: "5d" })

        // exclude the password before sending
        const { password: userPassword, ...userDetails } = user.toObject()
        return res.status(200).json({
            message: `Welcome ${user.name}`,
            token,
            user: userDetails
        })

    } catch (error) {
        return res.status(403).json({
            message: error.message
        })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        return res.status(200).json({
            message: user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const userList = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const users = await User.find().select("-password")
        return res.status(200).json({
            message: "User List",
            users
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const user = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const id = req.params.id
        const user = await User.findById(id)

        if (!user) {
            return res.status(403).json({
                message: "Invalid User Detail"
            })
        }
        const { password: userPassword, ...userDetails } = user.toObject()
        return res.status(200).json({
            message: "User Detail",
            user:userDetails
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const id = req.params.id

        const user = await User.findById(id)

        if (!user) {
            return res.status(403).json({
                message: "Invalid User Detail"
            })
        }

        rm(user.image,()=>{
            console.log('image deleted');
        })
        await user.deleteOne()

        return res.json({
            message: "User Detail Deleted Success"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}