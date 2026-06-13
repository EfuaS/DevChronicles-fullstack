import express from "express";
import bcrypt from "bcrypt";
import zod from "zod";
import {
  CommentDTO,
  LoginUserDTO,
  PostDTO,
  RegisterUserDTO,
} from "./utils/types.js";
import { pool } from "./utils/db.js";
import swaggerJSDoc, {Options} from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const api = express();
const port = 7074;

const swaggerConfig: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevChronicles API",
      version: "1.0.0",
      description: "API Documentation for the dev chronicles API",
    },
    servers: [
      {
        url: "http://localhost:7074",
        description: "Development server",
      },
    ],
  },
  // / relative paths to files that contain endpoints like this one
  apis: [ "./index.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerConfig);

api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// register users
/**
 * @swagger
 * /api/users:
 *   post:
 *    summary: Register new users to DevChronicles
 *    description: Creates a new user record.
 *    responses:
 *      200:
 *      description: User {username} created successfully.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "User johndoe created successfully."
 */
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
      res.status(500).send(new Error("Something went wrong." + error)),
    )
    .then(() => res.send("Post deleted successfully."));
});

// add a comment
api.post("/api/comments", async (req, res) => {
  const comment: CommentDTO = req.body;

  const commentSchema = zod.object({
    message: zod.string().max(250, "Max number of characters is 250."),
    userId: zod.uuid(),
    postId: zod.uuid(),
  });

  const { success, error } = zod.safeParse(commentSchema, comment);

  if (!success) {
    return res.status(400).send(" Bad Request" + error);
  }

  await pool
    .query(
      `INSERT INTO comments (created_at, message, post_id,user_id) VALUES (${new Date().toISOString()}, ${comment.message}, ${comment.postId}, ${comment.userId});`,
    )
    .then(() => res.status(200).send("Comment created!"))
    .catch(()=> res.status(500).send("Oops something went wrong"))
});

//like a post
api.patch("/api/posts/:id", async (req,res)=>{
    const postId = req.params.id;

    const { success } = zod.safeParse(zod.uuid(), postId);

    if (!success) {
      return res.status(404).send("Not found");
    }

      await pool
        .query(`UPDATE posts SET like_count = like_count + 1 WHERE id = ${postId};`)
        .catch((error) =>
          res.status(500).send(new Error("Something went wrong." + error)),
        )
        .then(() => res.send("Post liked successfully."));


})

api.listen(port, () => {
  console.log("Dev Chronicles API listening on port on 7074!");
});


