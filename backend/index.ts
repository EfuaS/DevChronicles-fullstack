import express from "express";
import bcrypt from "bcrypt";
import * as zod from "zod";

import { LoginUserDTO, PostDTO, RegisterUserDTO, UserDTO } from "./types";

const api = express();
const port = 7074;

// register users
api.post("/api/users", async (req, res) => {
  const regDetails: RegisterUserDTO = req.body;
  // encrypt password and save record to db.
  const hash = await bcrypt.hash(regDetails.password, 10);
  // save to database

  res.send(`User ${regDetails.displayName} created successfully.`);
});

// Login user
api.post("/api/users/login", async (req, res) => {
  const loginDetails: LoginUserDTO = req.body;

  // retrieve hashed password from database
  const user: UserDTO = {}; // fetch user record where email matches.
  // compare passwords and email
  const isMatch = await bcrypt.compare(loginDetails.password, user.password);
  if (isMatch) {
    return res.status(200).json({
      success: true,
      token: "2f2ht949", // implement better
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

// POSTS
api.post("/api/posts", (req, res) => {
  const postDetails: PostDTO = req.body;
  // validation
  // feed into database
});

api.listen(port, () => {
  console.log("Dev Chronicles API listening on port on 7074!");
});
