import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true // ggf. false bei lokalen Tests
    }
});
