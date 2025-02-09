import express from "express";
import Users from "../models/Users.js";
import Appointment from "../models/Appointment.js";
import sendResponse from "../Helpers/sendResponse.js";
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