import express from "express";
import bcrypt from "bcrypt";
import zod from "zod";
import { LoginUserDTO, RegisterUserDTO } from "./utils/types.js";
import { pool } from "./utils/db.js";

const api = express();
// api.use(express.json()) ;
const port = 7074;

// register users
api.post("/api/users", async (req, res) => {
  const regDetails: RegisterUserDTO = req.body;

  // validation
  const regSchema = zod.object({
    username: zod.string().min(5),
    email: zod.email().nonempty(),
    password: zod.string().min(8),
  });

  const validate = regSchema.safeParse(regDetails);

  if (!validate.success) {
    return res
      .status(400)
      .json({ message: "Invalid details provided", error: validate.error });
  }

  // encrypt password and save record to db.
  const hash = await bcrypt.hash(regDetails.password, 10);

  // save to database
  await pool.query(
    "INSERT INTO users (username, password, email, id) VALUES ($1, $2, $3, $4)",
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
api.post("/api/users/login", async (req, res) => {
  const schema = zod.object({
    email: zod.email(),
    password: zod.string().min(8),
  });
  const loginDetails: LoginUserDTO = req.body;

  const validate = schema.safeParse(loginDetails);

  if (!validate.success) {
    return res.status(400).send("Invalid Email or Password");
  }

  // retrieve hashed password from database
  const hash = await pool.query(
    `SELECT password FROM users WHERE email = '${loginDetails.email}'`,
  );

  if (hash.rowCount === 0) {
    return res.status(400).send("Invalid username or password");
  }

  // compare passwords and email
  const isMatch = await bcrypt.compare(
    loginDetails.password,
    hash.rows[0].password,
  );

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  return res.status(200).json({
    success: true,
    token: "2f2ht949", // implement jwt
  });
});

api.listen(port, () => {
  console.log("Dev Chronicles API listening on port on 7074!");
});
