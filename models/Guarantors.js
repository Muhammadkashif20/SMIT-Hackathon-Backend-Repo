import mongoose from "mongoose";
const { Schema } = mongoose;
const GuarantorSchema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true  , maxlength: 11},
      email: { type: String, required: true },
      userId:{type:Schema.Types.ObjectId}
    },
    guarantors: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: true },
        cnic: { type: String,  required: true , maxlength: 13},
      },
    ],
  },
  { timestamps: true }
);

const GuarantorsInfo = mongoose.model("Guarantor", GuarantorSchema);
export default GuarantorsInfo;
