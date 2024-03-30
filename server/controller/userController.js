import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

import { client } from "../config/db.js";
const db = client.db("Cars");
const userCollection = db.collection("Users");
/////////////////////////////

const userRegister = asyncHandler(async (req, res) => {
  const { user_info, user_email, password, user_location } = req.body;

  if (!user_info || !user_email || !password || !user_location) {
    throw new Error("Please fill all the fields!");
  }

  const userExists = await userCollection.findOne({ user_email });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Hash password before storing it in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = {
    user_info,
    user_email,
    password: hashedPassword,
    isAdmin: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    const user = await userCollection.insertOne(userData);
    createToken(res, user._id);
    console.log(user);

    if (!user) {
      throw new Error({ message: "Error inserting" });
    }
    res.status(200).json({
      _id: userData._id,
      user_email: userData.user_email,
      user_info: userData.user_info,
      isAdmin: userData.isAdmin,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Server Error" });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    throw new Error("Please fill all the fields!");
  }

  const existingUser = await userCollection.findOne({ user_email });

  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        user_email: existingUser.user_email,
        user_info: existingUser.user_info,
        isAdmin: existingUser.isAdmin,
        created_at: existingUser.created_at,
        updated_at: existingUser.updated_at,
      });
    } else {
      res.status(401).send("Not authorized, token failed.");
    }
  } else {
    return res.status(401).send({ message: "User Not Found" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("CarJWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Successfully logged out",
  });
});

export { userRegister, userLogin, logoutCurrentUser };
