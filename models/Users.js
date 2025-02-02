import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    password: { type: String, required: true },
    cnic: { type: Number, unique: true,  },
    email: { type: String, required: true },
    country: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
export default Users;
