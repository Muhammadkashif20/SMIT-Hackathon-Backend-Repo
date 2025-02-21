import express from "express";
import Users from "../models/Users.js";
import Appointment from "../models/Appointment.js";
import sendResponse from "../Helpers/sendResponse.js";
import AppointmentSlip from "../models/Slip.js";
const router = express.Router();

// Get appointments
router.get("/getAppointment", async (req, res) => {
  const { city, country } = req.query;
  console.log("req.query=>",req.query);
  let appointmentRequest = null;
  if (city && country) {
    appointmentRequest = await Appointment.find({ city, country });
  } else {
    appointmentRequest = await Appointment.find();
  }
  if (!appointmentRequest) return sendResponse(res, 400, true, null, "Appointment Request Failed");
  sendResponse(res, 200, false, appointmentRequest, "Appointment Request Successfully");
});
// Get All Appointment Slip
router.get("/getSlip",async(req,res)=>{
  const {date,time,officeLocation}=req.body
  console.log("req.body=>",req.body);
  console.log("req.body.date=>",req.body.date);
  console.log("req.body.time=>",req.body.time);
  console.log("req.body.officeLocation=>",req.body.officeLocation);
  
  let appointmentSlips = await AppointmentSlip.find(date,time,officeLocation);
  if (!appointmentSlips) return sendResponse(res, 400, true, null, "Get Appointment Slips Failed");
  sendResponse(res, 200, false, appointmentSlips, "Get Appointment Slips Successfully");
})
// Add an appointment
router.post("/addAppointment", async (req, res) => {
  const { userId, applicationId, appointmentDate, appointmentTime, location } = req.body;
  const newAppointment = new Appointment({ userId, applicationId, appointmentDate, appointmentTime, location });
  await newAppointment.save();
  if (!newAppointment) return sendResponse(res, 400, true, null, "Appointment Request Failed");

  // Send appointment confirmation email
  const user = await Users.findById(userId);
  if (user) {
    await sendEmail(user.email, "Appointment Confirmation", `Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.`);
  }
  sendResponse(res, 201, false, newAppointment, "Appointment Request Successfully");
});
export default router