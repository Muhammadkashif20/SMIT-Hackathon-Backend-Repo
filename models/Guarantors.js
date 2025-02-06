import mongoose from "mongoose";
const { Schema } = mongoose;

const GuarantorSchema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    guarantors: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: true },
        cnic: { type: String, unique: true, required: true }, 
      },
    ],
  },
  { timestamps: true }
);

const GuarantorsInfo = mongoose.model("Guarantor", GuarantorSchema);
export default GuarantorsInfo;
