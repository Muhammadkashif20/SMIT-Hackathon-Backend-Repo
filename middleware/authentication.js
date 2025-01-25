import sendResponse from "../Helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Users from "../models/Users.js";

export async function authicateUser(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    console.log("Authorization=> ", bearerToken);

    if (!bearerToken)
      return sendResponse(res, 401, true, null, "Token is Required");

    const token = bearerToken.split(" ")[1];
    console.log("token=> ", token);

    if (!token) return sendResponse(res, 401, true, null, "Token is Required");

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("decoded=> ", decoded);

    if (decoded) {
      const user = await Users.findById(decoded._id);
      if (!user) return sendResponse(res, 401, true, null, "User not found");
      req.user = decoded;
      return next();
    }
    
    else{
        return sendResponse(res, 401, true, null, "Invalid Token");
    }
  } catch (error) {
    console.error("Error in auth middleware: ", error.message);
    return sendResponse(res, 401, true, null, "Something Went Wrong!");
  }
}
