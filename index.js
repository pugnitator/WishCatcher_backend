import express from "express";
import mongoose from "mongoose";
import wishRouter from "./src/routers/wishRouter.js";
import userRouter from "./src/routers/userRouter.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/wish', wishRouter);
app.use('/api', userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

startApp();