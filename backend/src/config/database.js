import mysql from 'mysql2/promise';

/** MySQL pool — see repository root `.env.example` and `backend/README.md`. */
export function createPool() {
  return mysql.createPool({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });
}
