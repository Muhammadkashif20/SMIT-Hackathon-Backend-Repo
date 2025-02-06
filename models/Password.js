import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  const Password = mongoose.model('Password', passwordSchema);
  export default Password;