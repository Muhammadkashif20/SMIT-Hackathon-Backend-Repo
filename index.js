import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routers/users.js";
import authRouter from "./routers/auth.js";
import loanRequestRouter from "./routers/loanRequest.js";

const app = express();
const PORT = 5000;
mongoose
.connect(process.env.MONGODBURI)
.then(() => console.log("Mongodb is Connected!"))
.catch((err) => console.log("Error", err));
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/loan", loanRequestRouter);
app.listen(PORT, () => console.log("Port is Running ON =>", PORT));

