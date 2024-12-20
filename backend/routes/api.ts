

// import express, { Request, Response, Router } from 'express';
// import db from '../config/db';

// const router: Router = express.Router();

// // Utility function to execute queries with a promise wrapper
// const performQuery = async (query: string, params: any[] = []) => {
//   try {
//     const [result] = await db.query(query, params);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// // Reusable CRUD handler
// const handleCRUD = async (
//   req: Request,
//   res: Response,
//   operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'SIGNUP', // Added SIGNUP
//   table: string,
//   data: Record<string, any> = {},
//   conditions: Record<string, any> = {}
// ): Promise<void | Response> => { // Updated return type
//   try {
//     let query = '';
//     const queryParams: any[] = [];

//     switch (operation) {
//       case 'CREATE': {
//         const keys = Object.keys(data).join(', ');
//         const placeholders = Object.values(data).map(() => '?').join(', ');
//         query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
//         queryParams.push(...Object.values(data));
//         break;
//       }
//       case 'READ': {
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `SELECT * FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(conditions));
//         break;
//       }
//       case 'UPDATE': {
//         const setClause = Object.keys(data)
//           .map((key) => `${key} = ?`)
//           .join(', ');
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `UPDATE ${table} SET ${setClause} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(data), ...Object.values(conditions));
//         break;
//       }
//       case 'DELETE': {
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `DELETE FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(conditions));
//         break;
//       }
//       case 'SIGNUP': { // Handle the SIGNUP case
//         const { firstName, lastName, middleInitial, age, contactNumber, yearLevel, course, dormName, dormAddress, capacity, accountType } = req.body;

//         // Start transaction
//         await db.query('BEGIN');

//         if (accountType === 'applicant') {
//           // Insert into applicants table
//           const insertApplicantQuery = `INSERT INTO applicants (firstname, lastname, middleInitial, age, contactNumber, yearLevel, course) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//           await performQuery(insertApplicantQuery, [firstName, lastName, middleInitial, age, contactNumber, yearLevel, course]);
//         } else if (accountType === 'land_owner') {
//           // Insert into landowners table
//           const insertLandOwnerQuery = `INSERT INTO landowners (firstname, lastname, middleInitial, dormName, dormAddress, capacity, contactNumber) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//           await performQuery(insertLandOwnerQuery, [firstName, lastName, middleInitial, dormName, dormAddress, capacity, contactNumber]);
//         } else {
//           return res.status(400).json({ success: false, message: 'Invalid account type' });
//         }

//         // Commit the transaction
//         await db.query('COMMIT');
//         return res.status(200).json({ success: true, message: 'User registered successfully!' });
//       }
//       default:
//         throw new Error('Invalid CRUD operation');
//     }

//     const result = await performQuery(query, queryParams);

//     res.json({
//       message: `${operation} operation successful`,
//       data: result,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };

// // Route to handle CRUD and SIGNUP actions
// router.post('/signup', async (req: Request, res: Response) => {
//   await handleCRUD(req, res, 'SIGNUP', '', req.body); // Pass the request body as data
// });

// export default router;



import express, { Request, Response, Router } from 'express';
import db from '../config/db';

const router: Router = express.Router();

// Utility function to execute queries with a promise wrapper
const performQuery = async (query: string, params: any[] = []) => {
  try {
    const [result] = await db.query(query, params);
    return result;
  } catch (error) {
    throw error;
  }
};

// Reusable CRUD handler
const handleCRUD = async (
  req: Request,
  res: Response,
  operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE',
  table: string,
  data: Record<string, any> = {},
  conditions: Record<string, any> = {}
): Promise<void> => {
  try {
    let query = '';
    const queryParams: any[] = [];

    switch (operation) {
      case 'CREATE': {
        const keys = Object.keys(data).join(', ');
        const placeholders = Object.values(data).map(() => '?').join(', ');
        query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
        queryParams.push(...Object.values(data));
        break;
      }
      case 'READ': {
        const whereClause = Object.keys(conditions)
          .map((key) => `${key} = ?`)
          .join(' AND ');
        query = `SELECT * FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        queryParams.push(...Object.values(conditions));
        break;
      }
      case 'UPDATE': {
        const setClause = Object.keys(data)
          .map((key) => `${key} = ?`)
          .join(', ');
        const whereClause = Object.keys(conditions)
          .map((key) => `${key} = ?`)
          .join(' AND ');
        query = `UPDATE ${table} SET ${setClause} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        queryParams.push(...Object.values(data), ...Object.values(conditions));
        break;
      }
      case 'DELETE': {
        const whereClause = Object.keys(conditions)
          .map((key) => `${key} = ?`)
          .join(' AND ');
        query = `DELETE FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        queryParams.push(...Object.values(conditions));
        break;
      }
      default:
        throw new Error('Invalid CRUD operation');
    }

    const result = await performQuery(query, queryParams);

    res.json({
      message: `${operation} operation successful`,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Route to handle CREATE operation
router.post('/create/:table', async (req: Request, res: Response) => {
  const { table } = req.params;
  const data = req.body;

  await handleCRUD(req, res, 'CREATE', table, data);
});

// Route to handle READ operation
router.get('/read/:table', async (req: Request, res: Response) => {
  const { table } = req.params;
  const conditions = req.query;

  await handleCRUD(req, res, 'READ', table, {}, conditions);
});

// Route to handle UPDATE operation
router.put('/update/:table', async (req: Request, res: Response) => {
  const { table } = req.params;
  const { data, conditions } = req.body;

  await handleCRUD(req, res, 'UPDATE', table, data, conditions);
});

// Route to handle DELETE operation
router.delete('/delete/:table', async (req: Request, res: Response) => {
  const { table } = req.params;
  const conditions = req.body;

  await handleCRUD(req, res, 'DELETE', table, {}, conditions);
});

export default router;

// import express, { Request, Response, Router } from 'express';
// import db from '../config/db';

// const router: Router = express.Router();

// // Utility function to execute queries with a promise wrapper
// const performQuery = async (query: string, params: any[] = []) => {
//   try {
//     const [result] = await db.query(query, params);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// // Reusable CRUD handler
// const handleCRUD = async (
//   req: Request,
//   res: Response,
//   operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'SIGNUP', // Added SIGNUP
//   table: string,
//   data: Record<string, any> = {},
//   conditions: Record<string, any> = {}
// ): Promise<void | Response> => { // Updated return type
//   try {
//     let query = '';
//     const queryParams: any[] = [];

//     switch (operation) {
//       case 'CREATE': {
//         const keys = Object.keys(data).join(', ');
//         const placeholders = Object.values(data).map(() => '?').join(', ');
//         query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
//         queryParams.push(...Object.values(data));
//         break;
//       }
//       case 'READ': {
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `SELECT * FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(conditions));
//         break;
//       }
//       case 'UPDATE': {
//         const setClause = Object.keys(data)
//           .map((key) => `${key} = ?`)
//           .join(', ');
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `UPDATE ${table} SET ${setClause} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(data), ...Object.values(conditions));
//         break;
//       }
//       case 'DELETE': {
//         const whereClause = Object.keys(conditions)
//           .map((key) => `${key} = ?`)
//           .join(' AND ');
//         query = `DELETE FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
//         queryParams.push(...Object.values(conditions));
//         break;
//       }
//       case 'SIGNUP': { // Handle the SIGNUP case
//         const { firstName, lastName, middleInitial, age, contactNumber, yearLevel, course, dormName, dormAddress, capacity, accountType } = req.body;

//         // Start transaction
//         await db.query('BEGIN');

//         if (accountType === 'applicant') {
//           // Insert into applicants table
//           const insertApplicantQuery = `INSERT INTO applicants (firstname, lastname, middleInitial, age, contactNumber, yearLevel, course) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//           await performQuery(insertApplicantQuery, [firstName, lastName, middleInitial, age, contactNumber, yearLevel, course]);
//         } else if (accountType === 'land_owner') {
//           // Insert into landowners table
//           const insertLandOwnerQuery = `INSERT INTO landowners (firstname, lastname, middleInitial, dormName, dormAddress, capacity, contactNumber) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//           await performQuery(insertLandOwnerQuery, [firstName, lastName, middleInitial, dormName, dormAddress, capacity, contactNumber]);
//         } else {
//           return res.status(400).json({ success: false, message: 'Invalid account type' });
//         }

//         // Commit the transaction
//         await db.query('COMMIT');
//         return res.status(200).json({ success: true, message: 'User registered successfully!' });
//       }
//       default:
//         throw new Error('Invalid CRUD operation');
//     }

//     const result = await performQuery(query, queryParams);

//     res.json({
//       message: `${operation} operation successful`,
//       data: result,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };

// // Route to handle CREATE operation
// router.post('/create/:table', async (req: Request, res: Response) => {
//   const { table } = req.params;
//   const data = req.body;

//   await handleCRUD(req, res, 'CREATE', table, data);
// });

// // Route to handle READ operation
// router.get('/read/:table', async (req: Request, res: Response) => {
//   const { table } = req.params;
//   const conditions = req.query;

//   await handleCRUD(req, res, 'READ', table, {}, conditions);
// });

// // Route to handle UPDATE operation
// router.put('/update/:table', async (req: Request, res: Response) => {
//   const { table } = req.params;
//   const { data, conditions } = req.body;

//   await handleCRUD(req, res, 'UPDATE', table, data, conditions);
// });

// // Route to handle DELETE operation
// router.delete('/delete/:table', async (req: Request, res: Response) => {
//   const { table } = req.params;
//   const conditions = req.body;

//   await handleCRUD(req, res, 'DELETE', table, {}, conditions);
// });

// // Route to handle SIGNUP action
// router.post('/signup', async (req: Request, res: Response) => {
//   await handleCRUD(req, res, 'SIGNUP', '', req.body); // Pass the request body as data
// });

// export default router;
