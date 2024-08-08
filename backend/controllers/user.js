import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { rm } from "fs"
import { User } from '../models/User.js';
import sendMail from '../middleware/sendMail.js';

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
            image: image?.path
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
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        if (user.status === 0) {
            return res.status(401).json({
                message: "Account is deactivated. please contact your administrator"
            })
        }
        // password check
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        // generate sign in token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: "5d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Ensure secure cookies in production
            sameSite: 'None', // SameSite attribute set to None
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        // exclude the password before sending
        const { password: userPassword, ...userDetails } = user.toObject()
        return res.status(200).json({
            message: `Welcome ${user.name}`,
            // token,
            user: userDetails
        })

    } catch (error) {
        return res.status(403).json({
            message: error.message
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'None', // SameSite attribute set to None
            secure: process.env.NODE_ENV !== "development" // Ensure secure cookies in production
        });
        return res.status(200).json({
            message: "Logged out.."
        })
    } catch (error) {
        return res.status(403).json({
            message: error.message
        })
    }
};

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        return res.status(200).json({
            user
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
            user: userDetails
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateUserById = async (req, res) => {

    try {
        if (req.user.role != "admin") {
            return res.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(403).json({
                message: "User not found"
            })
        }

        Object.assign(user, req.body);
        const image = req.file

        if (image) {
            if (user.image) {
                rm(user.image, () => {
                    console.log('image deleted');
                })
            }
            user.image = image?.path
        }

        await user.save();

        return res.json({
            message: "User detail Updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        Object.assign(user, req.body);
        const image = req.file

        if (image) {
            if (user.image) {
                rm(user.image, () => {
                    console.log('image deleted');
                })
            }
            user.image = image?.path
        }

        await user.save();

        return res.json({
            message: "Profile Updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updatePassword = async (req, res) => {

    try {
        const user = await User.findById(req.user._id)

        const { oldPassword, newPassword } = req.body

        // check current password and old password
        const checkPassword = await bcrypt.compare(oldPassword, user.password)

        if (checkPassword) {
            // convert password to hash
            user.password = await bcrypt.hash(newPassword, 10)
        }

        await user.save();

        return res.json({
            message: "password Updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User Email not Exists. contact administrator"
            })
        }

        // generate otp
        const otp = Math.floor(Math.random() * 1000000)

        // create signed activation token
        const activationToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, {
            expiresIn: "5m"
        })

        // send mail to user
        const message = `please verify your account using otp your otp is ${otp}`
        await sendMail(email, 'Verification opt do not share', message)

        return res.status(200).json({
            message: "OTP Send to your mail. otp validity is 5 minute",
            activationToken
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { otp, activationToken } = req.body

        let verify
        try {
            verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET)
        } catch (error) {
            return res.status(400).json({
                message: "Invalid or expired activation token"
            });
        }

        if (!verify) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        if (otp != verify.otp) {
            return res.status(400).json({
                message: "Wrong OTP"
            });
        }

        return res.status(200).json({
            message: "OTP Verification Scuessfully",
            userId: verify.user._id
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { id, newPassword } = req.body

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // convert password to hash
        user.password = await bcrypt.hash(newPassword, 10)

        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });

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
        if (user.image) {
            rm(user.image, () => {
                console.log('image deleted');
            })
        }

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