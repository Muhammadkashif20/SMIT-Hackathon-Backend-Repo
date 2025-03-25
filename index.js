import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routers/auth.js";
import loanRequestRouter from "./routers/loanRequest.js";
import appointmentsRouter from "./routers/appointment.js";
import guarantorRouter from "./routers/guarantor.js"

const app = express();
const PORT = 5000;
app.use(cors({
  origin: ["https://smit-hackathon-frontend.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
mongoose
.connect(process.env.MONGODBURI)
.then(() => console.log("Mongodb is Connected!"))
.catch((err) => console.log("Error", err));

app.use("/auth", authRouter);
app.use("/application",loanRequestRouter);
app.use("/appointments",appointmentsRouter);
app.use("/loan", loanRequestRouter);
app.use("/guarantor", guarantorRouter);
app.listen(PORT, () => console.log("Port is Running ON =>", PORT));

