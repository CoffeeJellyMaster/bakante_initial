// import express from 'express';
// import db from '../config/db';

// const router = express.Router();

// // Example endpoint to get data from the database
// router.get('/data', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM your_table');
//     res.json(rows);
//   } catch (error) {
//     res.status(500).send('Error fetching data from the database');
//   }
// });

// export default router;
import express, { Request, Response, Router, RequestHandler } from 'express';
import db from '../config/db';

const router: Router = express.Router();

// Explicitly define the return type for async functions as `void`
// RequestHandler already ensures void return type, so just use it correctly
const getData: RequestHandler = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM your_table');
    res.json(rows);  // We send the response, but no need to return anything
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from the database');
  }
};

const postData: RequestHandler = async (req: Request, res: Response) => {
  const { name, value } = req.body;
  if (!name || value === undefined) {
    return res.status(400).send('Name and value are required');
  }
  try {
    const [result] = await db.query('INSERT INTO your_table (name, value) VALUES (?, ?)', [name, value]);
    const insertId = (result as any).insertId; // Type assertion for insertId

    res.status(201).json({ message: 'Data inserted successfully', insertId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data into the database');
  }
};

// Apply routes to the router
router.get('/data', getData);
router.post('/data', postData);

export default router;
