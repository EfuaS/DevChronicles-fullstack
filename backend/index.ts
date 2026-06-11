import express from "express";
import bcrypt from "bcrypt";
import zod from "zod";
import { LoginUserDTO, PostDTO, RegisterUserDTO } from "./utils/types.js";
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
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
    [regDetails.username, hash, regDetails.email],
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

// Create post
api.post("/api/posts", async (req, res) => {
  const reqInput: PostDTO = req.body;

  const postSchema = zod.object({
    userId: zod.uuid("Post Creator required").nonempty(),
    createdAt: zod.iso.datetime("Date created required"),
    content: zod.string("Post content required").nonempty().max(400),
    title: zod.string("Post title required").nonempty().max(100),
  });

  const { success, error } = zod.safeParse(postSchema, reqInput);

  if (!success) {
    return res.status(400).send(error.message);
  }

  await pool.query(
    "INSERT INTO posts (title, created_at, content, user_id, like_count) VALUES ($1, $2, $3, $4, $5)",
    [reqInput.title, reqInput.createdAt, reqInput.content, reqInput.userId, 0],
  );

  return res.status(200).send(`Post created "${reqInput.title}" successfully.`);
});

// Get Posts
api.get("/api/posts", async (_, res) => {
  const { rowCount, rows } = await pool.query("SELECT * FROM posts;");

  res.json({
    totalCount: rowCount,
    items: rows,
  });
});

// get a post
api.get("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;

  const { success } = zod.safeParse(zod.uuid(), postId);

  if (!success) {
    return res.status(404).send("Not found");
  }

  const { rowCount, rows } = await pool.query(
    `SELECT * FROM post WHERE id = ${postId} ;`,
  );

  if (rowCount === 0) {
    return res.status(404).send("Not found");
  }

  return res.send(rows);
});

// delete a post
api.delete("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;

  const { success } = zod.safeParse(zod.uuid(), postId);

  if (!success) {
    return res.status(404).send("Not found");
  }

  await pool
    .query(`DELETE FROM posts WHERE id = ${postId};`)
    .catch((error) =>
      res.status(400).send(new Error("Something went wrong." + error)),
    )
    .then(() => res.send("Post deleted successfully."));
});

api.listen(port, () => {
  console.log("Dev Chronicles API listening on port on 7074!");
});
