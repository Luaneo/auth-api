import { Request, RequestHandler, Response } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "../utils/index.js";
import { loginSchema, registerSchema } from "./zod-schemas.js";

export const register: RequestHandler = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Validation error", error: result.error.issues[0].message });
    return;
  }
  const { username, email, password } = result.data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (existingUser.length > 0) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  try {
    const passwordHash = await hashPassword(password);

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

export const login: RequestHandler = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Validation error", error: result.error.issues[0].message });
    return;
  }
  const { email, password } = result.data;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (user.length === 0) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = await comparePassword(password, user[0].passwordHash);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
    return;
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
