import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import LoanRequest from "../models/LoanRequest.js";
import "dotenv/config";
import nodemailer from "nodemailer";
const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "unnamed9080@gmail.com",
    pass: "wrua ycat nydk ipjg",
  },
});

// Send email function
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `<unnamed9080@gmail.com>`,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};
// user Endpoints:-
router.get("/getLoanRequest", async (req, res) => {
  const { city, country } = req.query;
  let loanRequest = null;
  if (city && country) {
    loanRequest = await LoanRequest.find({ city, country });
  } else {
    loanRequest = await LoanRequest.find();
  }
  if (!loanRequest)
    return sendResponse(res, 400, true, null, "Loan Request Failed");
  sendResponse(res, 200, false, loanRequest, "Get Loan Request Successfully");
});
// admin Endpoints:-
router.get("/allApplication", async (req, res) => {
    let allApplication = await LoanRequest.find();
  if (!allApplication)
    return sendResponse(res, 400, true, null, "Application Request Failed");
  sendResponse(res,200,false, allApplication,"Get All Application Successfully")
  })
// admin Endpoints:-
 router.get("/getAppointmentByToken/:token", async (req, res) => { 
  const appointment = await LoanRequest.find({ token: req.params.token });
  if (!appointment)
    return sendResponse(res, 400, true, null, "Appointment Failed");
  sendResponse(res, 200, false, appointment, "Get Appointment By Token Successfully");
 })
// admin Endpoints:-
router.get("/applicationCityCountry", async (req, res) => {
  const { city, country } = req.query;
  let allApplication = null;
  if (city && country) {
    allApplication = await LoanRequest.find({ city, country });
  } else {
    allApplication = await LoanRequest.find();
  }
  if (!allApplication)
    return sendResponse(res, 400, true, null, "Application Request Failed");
  sendResponse(
    res,
    200,
    false,
    allApplication,
    "Get All Application Successfully"
  );
});

// user Endpoints:-
router.get("/getLoanRequestById/:id", async (req, res) => {
  const loan = await LoanRequest.findById(req.params.id);
  if (!loan)
    return sendResponse(res, 400, true, null, "Loan Request Not Found");
  sendResponse(res, 200, false, loan, "Get Loan Request By ID Successfully");
}); 

// user Endpoints:-
router.get("/getLoanRequestByCnic/:cnic", async (req, res) => {
  const loanRequest = await LoanRequest.find({ cnic: req.params.cnic });
  if (!loanRequest) return sendResponse(res, 400, true, null, "Loan Request Failed");
  sendResponse( res, 200, false, loanRequest, "Get Loan Request By Cnic Successfully");
});

// user Endpoints:-
 router.post("/addLoanRequest", async (req, res) => {
  const { cnic, email, name, loanType, categories, subCategories, maximumloan, loanperiod, country, city,status } = req.body;
  console.log("req.body=> ", req.body);
  try {
    if ( !cnic || !email || !loanType || !name || !categories || !subCategories || !maximumloan || !loanperiod || !city || !country){
          return sendResponse(res,400, true, null, "Please provide all required fields");
}
    let loanToken = Math.floor(100000 + Math.random() * 9000000).toString();
    const newLoanRequest = new LoanRequest({loanToken,email, name, cnic, loanType, categories, subCategories, maximumloan, loanperiod, city, country,status});
    console.log("newLoanRequest=>",newLoanRequest); 
    
    if (!newLoanRequest) return sendResponse(res, 400, true, null, "Loan Request Failed");
    const newLoan = await newLoanRequest.save();
    console.log("newLoan=>", newLoan);
    if (!newLoan) return sendResponse(res, 400, true, null, "Loan Request Failed");
    sendResponse(res, 201, false,newLoanRequest, "Loan Request Successfully");
  await sendEmail(email, "Loan Request Confirmation , Your loan request has been successfully submitted")
}
   catch (error) {
    console.log("error=>", error); 
  }
});
// admin endpoints:-
router.put("/updateApplicationStatus/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log("id=>", id);

    const { status } = req.body;
    console.log("status=>", status);
    const application = await LoanRequest.findByIdAndUpdate(id, { status }, { new: true} );
    console.log("application=>",application);
    if (!application) {
      return sendResponse(res, 400, true, null, "Application not found");
    }
    await sendEmail(application.email, "Loan Request Confirmation For Saylani Microfinance System!", `Your Loan Applicaton has been ${status}.`);
    return sendResponse(res, 200, false, application, "Application updated successfully");
  } catch (error) {
    console.log("error=>", error);
    return sendResponse(res, 500, true, null, "Internal server error");
  }
});
// admin endpoints:-
// If, for any reason, a token is not generated in the loan request, the admin can manually add it using this API.

router.post("/addTokenNumber", async (req, res) => {
  const { loanToken,_id } = req.body;
  console.log("req.body=>", req.body);
 try {
  if(!loanToken || !_id){
    return sendResponse(res,400,true,null,"Please provide all required fields")
  }
  const loanRequest = await LoanRequest.findById(_id);
  if(loanRequest.loanToken){
    return sendResponse(res,400,true,null,"Token already exist")
  }
  loanRequest.loanToken = loanToken;
  await loanRequest.save();
  sendResponse(res,201,false,loanRequest,"Token added successfully")
  await sendEmail(loanRequest.email, "Token Confirmation For Saylani Microfinance System!", `Your Token Number is ${loanToken}.`);
 } catch (error) {
  console.log("error=>",error);
 }
})
export default router;
