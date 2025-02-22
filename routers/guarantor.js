import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import GuarantorsInfo from "../models/Guarantors.js";
const router = express.Router();
router.get("/getGuarantorInfo", async (req, res) => {
    const storeUser = await GuarantorsInfo.find();
         console.log("storeUser=>",storeUser);
    if (!storeUser) return sendResponse(res, 400, true, null, "Guarantor Get Failed");
    sendResponse(res, 200, false, storeUser, "Guarantor Get Successfully");
  });

  router.post("/addGuarantorInfo", async (req, res) => {
    const {user,guarantors} = req.body;
      console.log("req.body=> ", req.body);
      console.log("guarantors=> ",guarantors);
      console.log("user=> ",user);
    try {
      if (!user.name || !user.address || !user.phone) {
        return sendResponse(res, 400, true, null, "Please provide all required fields"); 
      }
      const newGuarantorRequest =new GuarantorsInfo({user,guarantors});
      if (!newGuarantorRequest) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
      const newGuarantor=await newGuarantorRequest.save();

      if (!newGuarantor) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
      console.log("newGuarantor=>",newGuarantor);
      
       sendResponse(res, 201, false, newGuarantorRequest, "Guarantor Add Successfully");
    } catch (error) {
      sendResponse(res, 500, true, null, "Server Error: " + error.message);
    }
  });
  

 

  
  export default router;
  


  
