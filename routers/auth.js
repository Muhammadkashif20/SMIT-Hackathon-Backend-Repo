import express from "express";
const router = express.Router();
import Joi from "joi";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from 'jsonwebtoken'
import sendResponse from "../Helpers/sendResponse.js";
import Users from "../models/Users.js";
const registerSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6),
  fullname: Joi.string().alphanum().min(3).max(30).required(),
});
const loginSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6),
  });
router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, null, true, error.message);
  console.log("value=> ", value);
  const user = await Users.findOne({ email: value.email });
  if (user) return sendResponse(res, 400, null, true, "User Already Exist");
  const hashPassword = await bcrypt.hash(value.password, SaltRounds);
  value.password = hashPassword;
  let newUser = new Users({ ...value });
  newUser = await newUser.save();
  sendResponse(res, 201, newUser, false, "User Registered Successfully");
});
router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  console.log("error=> ", error);
  if (!error) return sendResponse(res, 400, null, true, error.message);
  console.log("value=> ", value);
  const user = await Users.findOne({ email: value.email }).lean();
  if (!user) return sendResponse(res, 400, null, true,"User is Not Registered");
  const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid) return sendResponse(res, 400, null, true, "Invalid Credientals");
    var token = jwt.sign(user, 'shhhhh');
  let newUser = new Users({ ...value });
  newUser = await newUser.save();
  sendResponse(res, 201, newUser, false, "User Registered Successfully");
});

export default router;
