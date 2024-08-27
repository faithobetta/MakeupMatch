import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/review.js';
import appointmentRoutes from './routes/appointment.js';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error("DB Connection Error: ", err);
  });

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'front-end', 'dist')));

// Send all other requests to the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'dist', 'index.html'));
});

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Test route working' });
});

const port = process.env.PORT || 5174;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
