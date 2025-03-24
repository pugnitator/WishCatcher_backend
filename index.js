import express from "express";
import mongoose from "mongoose";
import wishRouter from "./src/routers/wishRouter.js";
import userRouter from "./src/routers/userRouter.js";
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const DB_URL = `mongodb+srv://pugnitator2000:CG4yCTNIkEvs69FL@cluster0.twfre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/wish', wishRouter);
app.use('/', userRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

startApp();
