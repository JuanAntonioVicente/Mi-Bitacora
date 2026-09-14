import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "juan",
  host: "localhost",
  database: "bitacora",
  password: "",
  port: 5432,
});