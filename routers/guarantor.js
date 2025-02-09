import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import GuarantorsInfo from "../models/Guarantors.js";
const router = express.Router();
router.get("/getGuarantorInfo", async (req, res) => {
    const {user,guarantor} = req.body;
    console.log("req.body=> ", req.body);
    // let guarantorRequest=null
    const storeUser = await GuarantorsInfo.find();
         console.log("storeUser=>",storeUser);
    // if (name && email && cnic && location) {
      //     guarantorRequest = await GuarantorsInfo.find({ name, email ,cnic,location});
      //   } else {
        // console.log("Guarantor=>",guarantorRequest);
      // }
      
    if (!storeUser) return sendResponse(res, 400, true, null, "Guarantor Get Failed");
    sendResponse(res, 200, false, storeUser, "Guarantor Get Successfully");
  });

  router.post("/addGuarantorInfo", async (req, res) => {
    const {user,guarantors} = req.body;
      console.log("req.body=> ", req.body);
      console.log("guarantors=> ",guarantors);
      console.log("user=> ",user);
      // console.log("req.body.guarantor:", req.body.guarantors);
    try {
      if (!user.name || !user.address || !user.phone) {
        return sendResponse(res, 400, true, null, "Please provide all required fields"); 
      }
      const newGuarantorRequest =new GuarantorsInfo({user,guarantors});
      if (!newGuarantorRequest) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
      const newGuarantor=await newGuarantorRequest.save();

      if (!newGuarantor) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
      console.log("newLoan=>",newGuarantor);
      
       sendResponse(res, 201, false, newGuarantorRequest, "Guarantor Add Successfully");
    } catch (error) {
      sendResponse(res, 500, true, null, "Server Error: " + error.message);
    }
  });
  

 

  
  export default router;
  


  
