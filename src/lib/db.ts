import Database from "better-sqlite3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const dbPath =
  process.env.DATABASE_PATH ||
  path.resolve(process.cwd(), "db", "my-database.db");

const db = new Database(dbPath);

export default db;
