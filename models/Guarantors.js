import mongoose from "mongoose";
const { Schema } = mongoose;
const GuarantorSchema = new Schema(
  {
    user: {
      name: { type: String, required: true ,length: 25},
      address: { type: String, required: true ,length: 30},
      phone: { type: Number, required: true , length: 11},
      email: { type: String, required: true },
      _id:{type:Schema.Types.ObjectId}
    },
    guarantors: [
      {
        name: { type: String, required: true ,length: 25},
        email: { type: String, required: true },
        location: { type: String, required: true ,length: 30},
        cnic: { type: String,  required: true , length: 13},
      },
    ],
  },
  { timestamps: true }
);

const GuarantorsInfo = mongoose.model("Guarantor", GuarantorSchema);
export default GuarantorsInfo;
