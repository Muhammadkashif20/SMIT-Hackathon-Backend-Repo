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
  const {userId, date, time, officeLocation, token } = req.body;
  console.log("req.body=> ", req.body);
  try {
    const newAppointmentSlip = new AppointmentSlip({userId, date, time, officeLocation, token });
    if (!newAppointmentSlip) return sendResponse(res, 400, true, null, "Appointment Slip Request Failed");
    const newSlip=await newAppointmentSlip.save();
    if (!newSlip) return sendResponse(res, 400, true, null, "Appointment Slip Request Failed");
    console.log("newSlip=>",newSlip);
     // Send appointment confirmation email
  const user = await Users.findById(userId);
  if (user) {
    await sendEmail(user.email, "Appointment Confirmation", `Your appointment has been scheduled on ${date} at ${time}.`);
  }
     sendResponse(res, 201, false, newAppointmentSlip, "Add Appointment Slip Successfully");
  } catch (error) {
   console.log("error=>",error);
  }
});
// extra check api
// router.post("/addAppointment", async (req, res) => {
//   const { userId, applicationId, appointmentDate, appointmentTime, location } = req.body;
//   const newAppointment = new Appointment({ userId, applicationId, appointmentDate, appointmentTime, location });
//   await newAppointment.save();
//   if (!newAppointment) return sendResponse(res, 400, true, null, "Appointment Request Failed");

//   // Send appointment confirmation email
//   const user = await Users.findById(userId);
//   if (user) {
//     await sendEmail(user.email, "Appointment Confirmation", `Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.`);
//   }
//   sendResponse(res, 201, false, newAppointment, "Appointment Request Successfully");
// });
export default router