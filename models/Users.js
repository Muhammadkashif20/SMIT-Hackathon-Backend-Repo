import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    cnic: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
export default Users;
