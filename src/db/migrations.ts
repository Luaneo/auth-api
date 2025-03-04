import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./index.js";

export async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations ran successfully");
  } catch (error) {
    console.error("Failed to run migrations:", error);
    process.exit(1);
  }
}
