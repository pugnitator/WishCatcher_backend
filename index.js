import express from "express";
import mongoose from "mongoose";
import wishRouter from "./src/routers/wishRouter.js";
import userRouter from "./src/routers/userRouter.js";

const PORT = process.env.PORT ?? 3000;
const DB_URL = `mongodb+srv://pugnitator2000:CG4yCTNIkEvs69FL@cluster0.twfre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
app.use(express.json());
app.use('/wish', wishRouter);
app.use('/user', userRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

startApp();


// app.get("/", async (req, res) => {
//   try {
//     const {a, b, c} = req.body;

//   }
//   res.send("Hello, World!");
// });

// app.get("/api/greetings", (req, res) => {
//   res.json({ message: "Welcome to your first API!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
