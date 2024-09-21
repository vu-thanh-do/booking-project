import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

dotenv.config();
// khởi tạo
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", userRouter);
mongoose.connect(process.env.URI);
app.get("/", async (req, res) => {
  res.json("success");
});

server.listen(process.env.PORT, (req, res) => {
  try {
    console.log(`Server is running on port ${process.env.PORT} `);
  } catch (error) {
    console.log(error);
  }
});
