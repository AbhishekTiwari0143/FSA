import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";

import { client } from "../config/db.js";
import { ObjectId } from "mongodb";
const db = client.db("Cars");
const userCollection = db.collection("Users");

// check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  const cursor = userCollection.find({
    _id: ObjectId("6603fbc12f8370d91b78b493"),
  });

  await cursor.toArray(function (err, docs) {
    console.log(docs);
  });

  //Read JWT from the 'CarJWT' cookie
  token = req.cookies.CarJWT;

  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId);
      const user = await userCollection.find({
        _id: ObjectId(decoded.userId),
      });

      if (!user) {
        res.status(401);
        throw new Error("User not found.");
      }

      req.user = user; // Attach user object to request

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authenticate why, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authenticate last, no token");
  }
});

//Check if the user is admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
