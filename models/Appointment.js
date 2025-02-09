import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true }, 
    appointmentDate: { type: Date, required: true }, 
    appointmentTime: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    location: { type: String, required: true }, 
    slotStatus: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now },
  });

  const Appointment = mongoose.model('Appointment', appointmentSchema);
  export default Appointment