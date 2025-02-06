import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import GuarantorsInfo from "../models/Guarantors.js";
const router = express.Router();
router.get("/getGuarantorInfo", async (req, res) => {
    const {name,email,cnic,location } = req.body;
    let guarantorRequest=null
    if (name && email && cnic && location) {
        guarantorRequest = await GuarantorsInfo.find({ name, email ,cnic,location});
      } else {
        guarantorRequest = await GuarantorsInfo.find();
      }
      console.log("Guarantor=>",guarantorRequest);
    if (!guarantorRequest) return sendResponse(res, 400, true, null, "Guarantor Get Failed");
    sendResponse(res, 200, false, guarantorRequest, "Guarantor Get Successfully");
  });

  // router.post("/addGuarantorInfo", async (req, res) => {
  //   const {name,email,cnic,location } = req.body;
  //     console.log("req.body=> ", req.body);
  //   try {
  //     if (!email || !name || !cnic || !location) {
  //       return sendResponse(res, 400, true, null, "Please provide all required fields"); 
  //     }
  //     const newGuarantorRequest = new GuarantorsInfo({name,email,cnic,location});

  //     if (!newGuarantorRequest) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
  //     const newGuarantor=await newGuarantorRequest.save();

  //     if (!newGuarantor) return sendResponse(res, 400, true, null, "Guarantor Add Failed");
  //     console.log("newLoan=>",newGuarantor);
      
  //      sendResponse(res, 201, false, newGuarantorRequest, "Guarantor Add Successfully");
  //   } catch (error) {
  //     sendResponse(res, 500, true, null, "Server Error: " + error.message);
  //   }
  // });
  
  
  // router.post("/addGuarantorInfo", async (req, res) => {
  //     const { user, guarantors } = req.body;
  
  //     console.log("req.body=> ", req.body);
  
  //     try {
  //         // Validate user fields
  //         if (!user || !user.name || !user.address || !user.phone) {
  //             return sendResponse(res, 400, true, null, "Please provide all required user fields");
  //         }
  
  //         // Validate guarantor fields
  //         if (!guarantors || guarantors.length < 2) {
  //             return sendResponse(res, 400, true, null, "Please provide at least 2 guarantors");
  //         }
  
  //         // ✅ Create a new document in the database
  //         const newGuarantorInfo = new GuarantorsInfo({
  //             user: {
  //                 name: user.name,
  //                 address: user.address,
  //                 phone: user.phone,
  //             },
  //             guarantors: guarantors.map(g => ({
  //                 name: g.name,
  //                 email: g.email,
  //                 location: g.location,
  //                 cnic: g.cnic
  //             }))
  //         });
  
  //         // ✅ Save the document
  //         await newGuarantorInfo.save();
  
  //         console.log("Saved Guarantor Info:", newGuarantorInfo);
  //         sendResponse(res, 201, false, newGuarantorInfo, "Guarantor Info Added Successfully");
  //     } catch (error) {
  //         sendResponse(res, 500, true, null, "Server Error: " + error.message);
  //     }
  // });
 

  
  export default router;
  


  
