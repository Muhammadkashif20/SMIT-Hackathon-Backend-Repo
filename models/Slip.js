import mongoose from "mongoose";
const { Schema } = mongoose;
const appointmentSlip = new Schema(
  {
    token:{type : Number, required: true},
    date: { type: String, required: true },
    time:{type: String, required: true},
    officeLocation: { type: String, required: true},
    email: { type: String },
  },
  { timestamps: true }
);
const AppointmentSlip = mongoose.model("AppointmentSlip", appointmentSlip); 
export default AppointmentSlip; 
