import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rm } from "fs";
import { User } from "../models/User.js";
import sendMail from "../middleware/sendMail.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user email address
    const user = await User.findOne({ email });
    if (email === "" || password === "") {
      return res.status(400).json({
        message: "Please fill Your Credentials",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    if (user.status === 0) {
      return res.status(401).json({
        message: "Account is deactivated. please contact your administrator",
      });
    }
    // password check
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // generate sign in token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "5d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Ensure secure cookies in production
      sameSite: "strict", // SameSite attribute set to None
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    // exclude the password before sending
    const { password: userPassword, ...userDetails } = user.toObject();
    return res.status(200).json({
      message: `Welcome ${user.name}`,
      // token,
      status: 200,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, password, status, role } = req.body;
    const image = req.file;
    console.log(req.body); // Debugging: Log the request body

    // Check for user role
    if (req.user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      password === ""
    ) {
      return res.status(400).json({
        message: "Please Fill all details",
      });
    }

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User email already exists",
      });
    }

    // Convert password to hash
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const insertUserDetails = await User.create({
      name,
      email,
      phone,
      address,
      password: hashPassword,
      status,
      role,
      image: image?.path,
    });

    // Exclude the password field before sending the response
    const { password: userPassword, ...newUser } = insertUserDetails.toObject();

    return res.status(201).json({
      message: "User registration successful",
      status: 201,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict", // SameSite attribute set to None
      secure: process.env.NODE_ENV !== "development", // Ensure secure cookies in production
    });
    return res.status(200).json({
      message: "Logged out..",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const userList = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 users per page
    const skip = (page - 1) * limit;

    // Fetch users with pagination and excluding the password field
    const users = await User.find().select("-password").skip(skip).limit(limit);

    // Get the total count of users
    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      message: "User List",
      status: 200,
      data: users,
      pagination: {
        totalUsers,
        totalPages: totalPages,
        previousPage: page > 1 ? page - 1 : null,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// single user
export const user = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({
        message: "Invalid User Detail",
      });
    }
    const { password: userPassword, ...userDetails } = user.toObject();
    return res.status(200).json({
      message: "User Detail",
      status: 200,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    const id = req.params.id;
    const user = await User.findById(id);

    // check email already exists
    const { email } = req.body;
    let userEmail = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.email !== req.body.email && userEmail) {
      return res.status(400).json({
        message: "User Email Already Exists",
      });
    }

    if (user.email !== email && userEmail) {
      return res.status(400).json({
        message: "User Email Already Exists",
      });
    }

    Object.assign(user, req.body);
    const image = req.file;

    if (image) {
      if (user.image) {
        rm(user.image, () => {
          console.log("image deleted");
        });
      }
      user.image = image?.path;
    }

    await user.save();

    const { password, ...updatedUser } = user.toObject();
    return res.json({
      message: "User detail Updated successfully",
      status: 200,
      // data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { email, phone, name, address } = req.body;

    // check email already exists
    let userEmail = await User.findOne({ email });

    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        message: "Please Fill all details",
      });
    }

    if (user.email !== email && userEmail) {
      return res.status(400).json({
        message: "User Email Already Exists",
      });
    }

    Object.assign(user, req.body);
    const image = req.file;

    if (image) {
      if (user.image) {
        rm(user.image, () => {
          console.log("image deleted");
        });
      }
      user.image = image?.path;
    }

    await user.save();

    const { password: userPassword, ...updatedUser } = user.toObject();
    return res.status(201).json({
      message: "Profile Updated successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
      return res.status(403).json({
        message: "old password & new password are should not same",
      });
    }

    // check current password and old password
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
      return res.status(403).json({
        message: "old password is Wrong",
      });
    }

    if (checkPassword) {
      // convert password to hash
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return res.status(201).json({
      message: "password Updated successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Email not Exists. contact administrator",
      });
    }

    // generate otp
    const otp = Math.floor(Math.random() * 1000000);

    if(process.env.NODE_ENV !== 'production'){
      console.log(otp);
    }

    // create signed activation token
    const activationToken = jwt.sign(
      { user, otp },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    // send mail to user
    const message = `please verify your account using otp your otp is ${otp}`;
    await sendMail(email, "Verification opt do not share", message);

    return res.status(200).json({
      message: "OTP Send to your mail. otp validity is 5 minute",
      status: 200,
      activationToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;

    let verify;
    try {
      verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    } catch (error) {
      return res.status(400).json({
        message: "Invalid or expired activation token",
      });
    }

    if (!verify) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    if (otp != verify.otp) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }

    return res.status(200).json({
      message: "OTP Verification Scuessfully",
      status: 200,
      userId: verify.user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // convert password to hash
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({
        message: "Invalid User Detail",
      });
    }
    if (user.image) {
      rm(user.image, () => {
        console.log("image deleted");
      });
    }

    await user.deleteOne();

    return res.status(200).json({
      message: "User Detail Deleted Success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
