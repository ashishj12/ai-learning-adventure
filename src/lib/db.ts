import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

// Singleton pattern: Next.js hot-reloads modules in dev, which would otherwise
// open a new sqlite file handle on every save. Cache on globalThis to avoid that.
declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

const DB_PATH = path.join(process.cwd(), "data", "app.db");
const SCHEMA_PATH = path.join(process.cwd(), "src", "lib", "schema.sql");

function createConnection() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  db.exec(schema);
  return db;
}

export const db = globalThis.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") {
  globalThis.__db = db;
}
