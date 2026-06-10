import { Pool } from "pg";
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "devchroniclesdb",
    password: "pa$$w0rd",
    port: 5432,
});
