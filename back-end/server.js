import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/review.js';
import appointmentRoutes from './routes/appointment.js';
//import { db } from './db.js';
import cors from 'cors';
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
   
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/review', reviewRoutes);
//MySQL db connection
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Test route working' });
});

app.listen(5174, () => {
  console.log("Server running on port 5174");
});
