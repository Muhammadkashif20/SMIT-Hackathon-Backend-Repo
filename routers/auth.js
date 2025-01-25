import express from "express";
const router = express.Router();
import Joi from "joi";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import sendResponse from "../Helpers/sendResponse.js";
import Users from "../models/Users.js";

const registerSchema = Joi.object({
  cnic: Joi.string().length(13).pattern(/^[0-9]+$/).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().alphanum().min(3).max(30).required(),
});

const loginSchema = Joi.object({
  cnic: Joi.string().length(13).pattern(/^[0-9]+$/).required(),  
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, null, true, error.message);
  console.log("value=> ", value);

  const user = await Users.findOne({ cnic: value.cnic });
  if (user) return sendResponse(res, 400, null, true, "User Already Exists");

  const hashPassword = await bcrypt.hash(value.password, 12);
  value.password = hashPassword;
  let newUser = new Users({ ...value });
  newUser = await newUser.save();
  sendResponse(res, 201, newUser, false, "User Registered Successfully");
});

router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, true, null, "Invalid Credentials");
  console.log("value=> ", value);

  const user = await Users.findOne({ cnic: value.cnic }).lean();
  if (!user)
    return sendResponse(res, 400, null, true, "User is Not Registered");

  const isPasswordValid = await bcrypt.compare(value.password, user.password);
  if (!isPasswordValid)
    return sendResponse(res, 400, null, true, "Invalid Credentials");

  var token = jwt.sign(user, process.env.AUTH_SECRET);
  console.log("token=> ", token);
  sendResponse(res, 201, { user, token }, false, "User Logged In Successfully");
});

export default router;
