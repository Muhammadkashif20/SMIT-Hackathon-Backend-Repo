import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import LoanRequest from "../models/LoanRequest.js";
const router=express.Router();
router.get("/getLoanRequest",async(req,res)=>{
  const loanRequest=await LoanRequest.find();
  if(!loanRequest) return sendResponse(res,400,null,true,"Loan Request Failed");
  sendResponse(res,200,loanRequest,false,"Loan Request Successfully");
});
router.post("/addLoanRequest",async(req,res)=>{
  const {email,name,subcategories,maximumloan,loanperiod}=req.body;
  const newLoanRequest=await new LoanRequest({name,email,subcategories,maximumloan,loanperiod});
  newLoanRequest.save()
  if(!newLoanRequest) return sendResponse(res,400,true,null,"Loan Request Failed");
    sendResponse(res,201,false,newLoanRequest,"Loan Request Successfully");
}
);
export default router