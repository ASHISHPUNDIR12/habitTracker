import User from "../model/auth.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All Fields Required" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      //Generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);
      // Save the user to MongoDB
      await newUser.save();

      // Respond with success message
      res.status(201).json({
        success: true,
        _id: newUser._id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ success: false, error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const checkPassword = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user || !checkPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid username or password" });
    }
    //Generate JWT Token
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      id: user._id,
      username: user.username,
      message: "User successfully logged in",
    });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(200)
      .json({ success: true, message: "User successfully logout!" });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};
