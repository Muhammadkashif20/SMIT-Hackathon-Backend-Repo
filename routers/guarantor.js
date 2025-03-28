import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import GuarantorsInfo from "../models/Guarantors.js";
import { sendEmail } from "./loanRequest.js";
import LoanRequest from "../models/LoanRequest.js";
const router = express.Router();
router.get("/getGuarantorInfo", async (req, res) => {
    const storeUser = await GuarantorsInfo.find();
         console.log("storeUser=>",storeUser);
    if (!storeUser) return sendResponse(res, 400, true, null, "Guarantor Get Failed");
    sendResponse(res, 200, false, storeUser, "Guarantor Get Successfully");
  }); 
  router.get("/getGuarantorInfoById/:id", async (req, res) => {
    const storeUser = await GuarantorsInfo.find({_id: req.params._id });
         console.log("storeUser=>",storeUser);
    if (!storeUser) return sendResponse(res, 400, true, null, "Guarantor Get Failed");
    sendResponse(res, 200, false, storeUser, "Guarantor Get Successfully");
  });

  router.post("/addGuarantorInfo", async (req, res) => {
    const { user, guarantors } = req.body;
    console.log("req.body=> ", req.body);
    try {
        if (!user.name || !user.address || !user.phone || !user.email) {
            return sendResponse(res, 400, true, null, "Please provide all required fields");
        }

        const loanRequest = await LoanRequest.findOne({ email: user.email });
        console.log("loanRequest=>", loanRequest);
        console.log("user.email=>", user.email);
        if (!loanRequest) {
            return sendResponse(res, 404, true, null, "No Loan Request Found for this user");
        }

        const newGuarantorRequest = new GuarantorsInfo({
            user: {
                _id: loanRequest._id,  
                name: user.name,
                address: user.address,
                phone: user.phone,
                email: user.email
            },
            guarantors
        });

        if (!newGuarantorRequest) return sendResponse(res, 400, true, null, "Guarantor Add Failed");

        const newGuarantor = await newGuarantorRequest.save();

        if (!newGuarantor) return sendResponse(res, 400, true, null, "Guarantor Add Failed");

        console.log("newGuarantor=>", newGuarantor);
        console.log("user.email=>", user.email);
        
        sendResponse(res, 201, false, newGuarantor, "Guarantor Added Successfully");
        sendEmail(user.email, "Saylani Microfinance System!", `Guarantor's & User Information Added Successfully!`);

    } catch (error) {
        sendResponse(res, 500, true, null, "Server Error: " + error.message);
    }
});

  

 

  
  export default router;
  


  
