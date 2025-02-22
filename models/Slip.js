import mongoose from "mongoose";
const { Schema } = mongoose;
const appointmentSlip = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    token:{type : Number, required: true},
    date: { type: String, required: true },
    time:{type: String, required: true},
    officeLocation: { type: String, required: true},
  },
  { timestamps: true }
);
const AppointmentSlip = mongoose.model("AppointmentSlip", appointmentSlip); 
export default AppointmentSlip; 
