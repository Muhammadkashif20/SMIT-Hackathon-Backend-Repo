import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User collection
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true }, // Link to application
    appointmentDate: { type: Date, required: true }, // Appointment date
    appointmentTime: { type: String, required: true }, // Example: '10:00 AM'
    location: { type: String, required: true }, // Office or branch location
    slotStatus: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now }, // Appointment creation timestamp
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  export default Appointment