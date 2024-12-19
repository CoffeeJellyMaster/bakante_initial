import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS middleware
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware (configurable to allow specific origins if needed)
app.use(cors());  // Allow all origins by default, you can configure this further

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
