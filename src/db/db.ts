import { Pool } from 'pg';

export const db = new Pool({
    host: "localhost",
    user: "adminPillenschlucker",
    password: "pille3000",
    database: "vuedb",
    port: Number(5432),
    ssl: false
});