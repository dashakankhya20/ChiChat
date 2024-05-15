import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, firstName, lastName, email, password } = req.body;
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(409).json("Username is already taken!");
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(409).json("Email ID is already used!");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    delete newUser.password;
    return res.status(200).json({ status: "ok", newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (!userExists) {
      res.status(404).json("Incorrect Username");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      res.status(404).json("Incorrect Password");
    }
    delete userExists.password;
    return res.json({ status: "ok", userExists });
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatarImage;

    // Update user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarImage, isAvatarImageSet: true },
      { new: true } // Return the updated document
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return response with updated user data
    return res.json({
      isSet: updatedUser.isAvatarImageSet,
      image: updatedUser.avatarImage,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

export const getAllOtherUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const otherUsers = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.status(200).json(otherUsers);
  } catch (error) {
    next(error);
  }
};
