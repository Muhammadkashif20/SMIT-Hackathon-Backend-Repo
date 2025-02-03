import express from "express";
const router = express.Router();
import Joi from "joi";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import sendResponse from "../Helpers/sendResponse.js";
import Users from "../models/Users.js";
const registerSchema = Joi.object({
  cnic: Joi.string()
    .length(13)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().min(3).required(),
});
const loginSchema = Joi.object({
  cnic: Joi.string()
    .length(13)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});
router.post("/proceed", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, true, null, error.message);
  console.log("value=> ", value);
  const user = await Users.findOne({ cnic: value.cnic });
  if (user) return sendResponse(res, 400, true, null, "User Already Exists");
  // after add new user generate a random password with converted into hashed:-
  let genRandomPass = Math.random().toString(36).slice(-8);
  console.log("genRandomPass=>", genRandomPass);
  let hashPass = await bcrypt.hash(genRandomPass, 10);
  console.log("hashPass=>", hashPass);
  let newUser = new Users({
    ...value,
    password: hashPass,
  });
  newUser = await newUser.save();
  console.log("newUser=> ", newUser);
  const responseData = { newUser, plainPassword: genRandomPass };
  console.log("Response Data=>", responseData); 
  sendResponse(res, 201, false, responseData, "User Registered Successfully");

});

router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  console.log("error=> ", error);
  if (error) return sendResponse(res, 400, true, null, "Invalid Credentials");
  console.log("value=> ", value);
  const user = await Users.findOne({ cnic: value.cnic })
    .select("+plainPassword")
    .lean();
  if (!user)
    return sendResponse(res, 400, null, true, "User is Not Registered");
  var token = jwt.sign(user, process.env.AUTH_SECRET);
  console.log("token=> ", token);
  sendResponse(res, 201,false, { user,token}, "User Logged In Successfully");
});

export default router;
