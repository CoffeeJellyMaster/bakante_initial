// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// const promisePool = pool.promise(); // Using promise-based API for async/await

// export default promisePool;
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise(); // Using promise-based API for async/await

// Exporting the query function to simplify usage
export default {
  query: (sql: string, params: any[] = []) => promisePool.query(sql, params),
};
