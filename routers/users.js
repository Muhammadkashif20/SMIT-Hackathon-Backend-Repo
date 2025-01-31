import express from "express";
import { authicateUser } from "../middleware/authentication.js";
// import Users from "../models/Users.js";
import sendResponse from "../Helpers/sendResponse.js";

const router = express.Router();
/* const users = [
  {
    id:1,
    fullname: "John Doe",
    email: "johndoe@example.com",
  },
];
router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    data: users,
    msg: "user fetched successfully ",
  });
});
router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  console.log("fullname=>",fullname);
  console.log("email=>",email);
  if (!fullname || !email) {
    return res.status(400).json({
      error: true,
      data: null,
      msg: "fullname and email are required",
    });
  }
  users.push({ fullname, email, id: users.length + 1 });
  res.status(200).json({
    error: false,
    data: users,
    msg: "user added successfully ",
  });
  
});
router.get("/:id", (req, res) => {  
  const user = users.find((data) => data.id === parseInt(req.params.id));
  console.log("user=>",user);
  if (!users) {
    return res.status(404).json({
      error: true,
      data: null,
      msg: "user not found",
    });
  }
    res.status(200).json({
      error: false,
      data: user,
      msg: "user found successfully ",
    });
  
}); */
// router.put("/", authicateUser, async(req,res)=>{
//   try {
//     const {city,country}=req.body
//     const user=await Users.findByIdAndUpdate({
//       _id:req.user._id
//     },
//   {
//     city,
//     country,
//   },
//   {
//     new:true
//   }
// ).exec(true)
//   sendResponse(res,200,false,user,"User Updated Successfully")
//     console.log("req.user=> ",req.user);
//   } catch (error) {
//     sendResponse(res,401,true,null,"Something went wrong");
//   }
// })
export default router;
