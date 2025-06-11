// src/db.ts
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'mysqlpillenschlucker.mysql.database.azure.com',
    user: 'adminPillenschlucker',
    password: 'uHk6pJeu4qrDECF',
    database: 'mysqlpillenschlucker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true // ggf. false bei lokalen Tests
    }
});