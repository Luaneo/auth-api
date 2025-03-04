import { Request, Response } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../utils/index.js";

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  console.log("trying to register user with", username, email);

  if (existingUser.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const passwordHash = await hashPassword(password);
    console.log("password hash:", passwordHash);

    await db.insert(users).values({
      username,
      email,
      passwordHash,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (user.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await comparePassword(password, user[0].passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
    },
  });
};
