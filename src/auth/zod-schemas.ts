import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().max(50, "Username should be at most 50 characters long"),
  email: z.string().email("Invalid email").max(100, "Email should be at most 100 characters long"),
  password: z.string().min(8, "Password whould be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email").max(100),
  password: z.string(),
});
