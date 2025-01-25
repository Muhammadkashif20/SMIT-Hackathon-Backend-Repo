import mongoose from "mongoose";
const { Schema } = mongoose;
const loanRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subcategories:{type: String, required: true},
    maximumloan:{type: Number, required: true},
    loanperiod:{type: Number, required: true},
  },
  { timestamps: true }
);
const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema); 
export default LoanRequest; 
