import generateToken from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new error("All field are required");
    }

    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const usernameTaken = await User.findOne({ username: username });

    if (usernameTaken) {
      return res
        .status(400)
        .json({ success: false, message: "This username is taken" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data" });
    }

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    return res.status(200).json({
      success: true,
      user: userToReturn,
      message: "New User created successfully",
    });
  } catch (error) {
    console.log(
      "Error from the sign up function in auth controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    const userToReturn = user.toObject();
    delete userToReturn.password;

    return res.status(200).json({
      success: true,
      user: userToReturn,
      message: "New User created successfully",
    });
  } catch (error) {
    console.log("Error from login function in auth controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error from logout function in auth controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user } = req;
    return res
      .status(200)
      .json({ success: true, user: user, message: "fetched the user" });
  } catch (error) {
    console.log(
      "Error from getUser function in auth controller",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
