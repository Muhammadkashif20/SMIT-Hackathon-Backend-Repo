import mongoose from "mongoose";
const { Schema } = mongoose;
const loanRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cnic: { type: Number, unique: true },
    categories: { type: String, required: true },
    loanType: { type: String, required: true },
    subCategories: { type: String, required: true },
    maximumloan: { type: Number, required: true },
    loanperiod: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    token: { type: String },
    status:{type:String, default:"pending"}
  },
  { timestamps: true }
);
const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);
export default LoanRequest;
