import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { error } from "console";

// Register
export const register = async (req, res) => {
    
  try {
    const { fullname, phoneNumber, email, password, role } = req.body;
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      phoneNumber,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Login
export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log("Email:", email, "Password:", password, "Role:", role);
  
      if (!email || !password || !role) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
  
      console.log("User Found:", user);
  
      if (!user.password) {
        return res.status(400).json({
          message: "Password is missing in user data",
          success: false,
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
  
      if (role !== user.role) {
        return res.status(400).json({
          message: "Account doesn't exist with current role.",
          success: false,
        });
      }
  
      const tokenData = {
        userId: user._id,
      };
  
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
  
      user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
  
      return res
        .status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        .json({
          message: `Welcome back ${user.fullname}`,
          user,
          success: true,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  

// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update Profile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing",
        success: false,
        
      });
      console.log(error)
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user details
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    // Handle file upload if file exists
    if (req.file) {
      console.log("Uploaded File:", req.file); // Debugging
      const fileUri = getDataUri(req.file);
      console.log("File URI:", fileUri); // Debugging

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      console.log("Cloudinary Response:", cloudResponse); // Debugging

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname; // FIXED: Use `originalname`
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
