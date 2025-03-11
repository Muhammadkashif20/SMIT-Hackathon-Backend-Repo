import express from "express";
import Users from "../models/Users.js";
import Appointment from "../models/Appointment.js";
import sendResponse from "../Helpers/sendResponse.js";
import AppointmentSlip from "../models/Slip.js";
import { sendEmail } from "./loanRequest.js";
const router = express.Router();
// Get All Appointment Slip
router.get("/getSlip",async(req,res)=>{
  let appointmentSlips = await AppointmentSlip.find();
  if (appointmentSlips.length === 0) return sendResponse(res, 400, true, null, "No Appointment Slip Found");
  sendResponse(res, 200, false, appointmentSlips, "Get Appointment Slips Successfully");
})
// Add Appointment Slip
router.post("/addSlip", async (req, res) => {
  const {date, time, officeLocation, token,email} = req.body;
  console.log("req.body=> ", req.body);
  try {
    const newAppointmentSlip = new AppointmentSlip({date, time, officeLocation, token });
    if (!newAppointmentSlip) return sendResponse(res, 400, true, null, "Appointment Slip Request Failed");
    const newSlip=await newAppointmentSlip.save();
    if (!newSlip) return sendResponse(res, 400, true, null, "Appointment Slip Request Failed");
    console.log("newSlip=>",newSlip);
    console.log("token=>",token);
    console.log("email=>",email);
    const user = await Users.findOne({email});
    console.log("user.email=>",user.email);
  
    // Send appointment confirmation email
    await sendEmail(user.email, "Appointment Confirmation For Saylani Microfinance System!", `Your appointment has been scheduled on ${date} at ${time}.`);
     sendResponse(res, 201, false, newAppointmentSlip, "Add Appointment Slip Successfully");
  } catch (error) {
   console.log("error=>",error);
  }
});

export default router;