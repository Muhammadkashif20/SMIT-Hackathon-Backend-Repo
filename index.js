import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routers/users.js"
import authRouter from "./routers/auth.js"
const app = express();
app.use(express.json());
const PORT = 5000;
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Mongodb is Connected!"))
  .catch((err) => console.log("Error", err));
app.use(cors());
app.use("/users",userRouter)
app.use("/auth",userRouter)

app.get("/login", (req, res) => {
  res.send("Login");
});
app.get("/signup", (req, res) => {
  res.send("signup");
});
app.get("/logout", (req, res) => {
    res.send("logout");
  });

app.listen(PORT, () => console.log("Port is Running ON =>", PORT));
