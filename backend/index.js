import express from "express";
import bcrypt from "bcrypt";
import zod from "zod";
// import { LoginUserDTO, PostDTO, RegisterUserDTO, UserDTO } from "./types";
import { pool } from "./db.js";

const api = express();
api.use(express.json()) ;
const port = 7074;

// register users
api.post("/api/users", async (req, res) => {
  const regDetails = req.body;

  // validation
  const regSchema = zod.object({
    username: zod.string().min(5),
    email: zod.email().nonempty(),
    password: zod.string().min(8)
  });

  const validate = regSchema.safeParse(regDetails);

  if (!validate.success) {
    return res.status(400).json({message:"Invalid details provided", error: validate.error});
  }
  console.log("Procedding!!");
  

  // encrypt password and save record to db.
  const hash = await bcrypt.hash(regDetails.password, 10);

  // save to database
  await pool.query(
    "INSERT INTO users (username, password, email, id) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      regDetails.username,
      hash,
      regDetails.email,
      "80203256-2150-4995-a735-73216656b11c",
    ],
  );

  res.send(`User ${regDetails.username} created successfully.`);
});

// Login user
// api.post("/api/users/login", async (req, res) => {
//   const loginDetails: LoginUserDTO = req.body;

//   // retrieve hashed password from database
//   const user: UserDTO = {}; // fetch user record where email matches.
//   // compare passwords and email
//   const isMatch = await bcrypt.compare(loginDetails.password, user.password);
//   if (isMatch) {
//     return res.status(200).json({
//       success: true,
//       token: "2f2ht949", // implement better
//     });
//   } else {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid email or password",
//     });
//   }
// });

// POSTS
api.post("/api/posts", (req, res) => {
  const postDetails = req.body;
  // validation
  // feed into database
});

api.listen(port, () => {
  console.log("Dev Chronicles API listening on port on 7074!");
});
