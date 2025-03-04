import { drizzle } from "drizzle-orm/node-postgres";
import pgpkg from "pg";
const { Pool } = pgpkg;
import * as schema from "./schema.js";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";

dotenv.config();

console.log("Connecting via", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
