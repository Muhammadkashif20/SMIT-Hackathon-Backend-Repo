import express from "express";
const router = express.Router();
import Joi from "joi";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import sendResponse from "../Helpers/sendResponse.js";
import Users from "../models/Users.js";
import { sendEmail } from "./loanRequest.js";
const registerSchema = Joi.object({
  cnic: Joi.string().length(13).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().min(3).required(),
  password: Joi.string().min(6).optional(),
});
const loginSchema = Joi.object({
  cnic: Joi.string().length(13).pattern(/^[0-9]+$/).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string() ,enum: ["user", "admin"], default : "user"
});
router.post("/proceed", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  console.log("req.body=>", req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, true, null, error.message);
  console.log("value=> ", value);
  const user = await Users.findOne({ cnic: value.cnic });
  if (user) return sendResponse(res, 400, true, null, "User Already Exists");
  // after add new user generate a random password with converted into hashed:-
  let genRandomPass = Math.random().toString(36).slice(-8);
  let hashPass = await bcrypt.hash(genRandomPass, 10);
  console.log("hashPass=>", hashPass);
  console.log("genRandomPass=>", genRandomPass);
  let newUser = new Users({
    ...value,
    password: hashPass,
  });
  newUser = await newUser.save();
  console.log("newUser=> ", newUser);
  const responseData = { newUser, plainPassword: genRandomPass };
  console.log("Response Data=>", responseData);
  sendResponse(res, 201, false, responseData, "User Registered Successfully");
  console.log("user.email=>", value.email);
  console.log("user.fullname=>", value.fullname);

  await sendEmail(
    value.email,
    "Account Created Successfully For Saylani Microfinance System!",
    `User: ${value.fullname}`
  );
  await sendEmail(
    value.email,
    "your Account Password For Saylani Microfinance System!",
    `Password: ${genRandomPass}`
  );
});
router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  console.log("req.body=>", req.body);
  console.log("error=> ", error);
  console.log("value=> ", value);

  if (error) return sendResponse(res, 400, true, null, "Invalid Credentials");

  const user = await Users.findOne({ cnic: value.cnic })
    .select("+password")
    .lean();
  console.log("User=>", user);

  if (!user)
    return sendResponse(res, 400, true, null, "User is Not Registered");
  const isMatch = await bcrypt.compare(value.password, user.password);
  console.log("isMatch=>", isMatch);
  console.log("value.password=>", value.password);
  console.log("user.password=>", user.password);
      console.log("user.role=>",user.role)
  if (!isMatch) return sendResponse(res, 400, true, null, "Incorrect password");
  var token = jwt.sign(user, process.env.AUTH_SECRET);
  sendResponse(res, 201, false, { user, token }, "User Logged In Successfully");
  await sendEmail(
    user.email,
    "Login Confirmation For Saylani Microfinance System!",
    `You have successfully logged in to Saylani Microfinance System.`
  );
});
router.post("/updatePassword", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token=>", token);
    if (!token) {
      return sendResponse(
        res,
        401,
        true,
        null,
        "Unauthorized: No token provided"
      );
    }
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const cnic = decoded.cnic;
    const { oldPassword, password } = req.body;
    console.log("Received Old Password:", oldPassword);
    const user = await Users.findOne({ cnic }).select("+password");
    if (!user) return sendResponse(res, 400, true, null, "User not found");
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("Password Match Result:", isMatch);
    if (!isMatch)
      return sendResponse(res, 400, true, null, "Old password is incorrect");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("New Hashed Password:", hashedPassword);
    user.password = hashedPassword;
    await user.save();
    sendResponse(res, 200, false, null, "Password updated successfully");
    await sendEmail(
      user.email,
      "Password Updated For Saylani Microfinance System!",
      `Your password has been updated successfully New Password is: ${password}`
    );
  } catch (error) {
    console.error("Error updating password:", error);
    sendResponse(res, 500, true, null, "Internal server error");
  }
});

export default router;
