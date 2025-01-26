import express from "express";
import sendResponse from "../Helpers/sendResponse.js";
import LoanRequest from "../models/LoanRequest.js";
import Users from "../models/Users.js";
import Appointment from "../models/Appointment.js";

const router=express.Router();
router.get("/getLoanRequest",async(req,res)=>{
  const {city,country}=req.query;
  let loanRequest = null
  if(city && country){
    loanRequest=await LoanRequest
    .find({city:city,country:country});
  }
  else{
    loanRequest=await LoanRequest.find();
  }
  if(!loanRequest) return sendResponse(res,400,null,true,"Loan Request Failed");
  sendResponse(res,200,loanRequest,false,"Loan Request Successfully");
});
router.get("/getLoanRequestById/:id",async(req,res)=>{
  const {id}=req.params
  const loan=await LoanRequest.find({_id:id})
  sendResponse(res,200,loan,false,"Loan Request Successfully");
});
router.get("/getLoanRequest/:cnic",async(req,res)=>{
  const loanRequest=await LoanRequest.find({cnic:req.params.cnic});
  if(!loanRequest) return sendResponse(res,400,null,true,"Loan Request Failed");
  sendResponse(res,200,loanRequest,false,"Loan Request Successfully");
});
router.post("/addLoanRequest",async(req,res)=>{
  const {email,name,subcategories,maximumloan,loanperiod}=req.body;
  const newLoanRequest=new LoanRequest({name,email,subcategories,maximumloan,loanperiod});
  const newUserRequest=Users.find({email:email});
  if(!newUserRequest) {
    const newUser=new Users({email:email,name:name});
  }
  await newLoanRequest.save()
  if(!newLoanRequest) return sendResponse(res,400,true,null,"Loan Request Failed");
    sendResponse(res,201,false,newLoanRequest,"Loan Request Successfully");
});
router.get("/getAppointment",async(req,res)=>{
  const {city,country}=req.query;
  let appointmentRequest = null
  if(city && country){
    appointmentRequest=await Appointment
    .find({city:city,country:country});
  }
  else{
    loanRequest=await Appointment.find();
  }
  if(!loanRequest) return sendResponse(res,400,null,true,"Appointment Request Failed");
  sendResponse(res,200,loanRequest,false,"Appointment Request Successfully");
});
export default router;