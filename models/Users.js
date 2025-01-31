import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullname: { type: String,  },
    cnic: { type: String, unique: true,  },
    password: { type: String,  },
    city: { type: String },
    country: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
export default Users;
