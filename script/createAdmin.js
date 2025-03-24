
import mongoose from "mongoose";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import "dotenv/config";
mongoose.connect(process.env.MONGODBURI) 
.then(() => console.log("Mongodb is Connected!")) 
.catch((err) => console.log("Error", err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Admin@123", 10); 
  const admin = new Users({
    fullname: "Admin Kashif",
    email: "adminKashif@gmail.com",
    cnic: "1234567891011", 
    password: hashedPassword,
    role: "admin",
  });
  await admin.save();
  console.log("Admin added successfully!");
  mongoose.connection.close();
};
createAdmin();