import express from 'express';
import authRoutes from './routes/auth.js';
import { db } from './db.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.listen(5174, () => {
  console.log("Server running on port 5174");
});
