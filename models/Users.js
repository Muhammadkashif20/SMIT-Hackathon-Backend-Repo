import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {   
    fullname:{type: String, unique: true},
    cnic: { type: Number, unique: true},
    email: { type: String, required: true },
    password: { type: String},
    country: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
export default Users;
