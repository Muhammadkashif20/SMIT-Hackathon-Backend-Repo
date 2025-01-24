import express from "express";
const router = express.Router();
import Joi from "joi";
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    // password:Joi.(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // email:
});
router.post("/register", (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return sendResponse(res, 400, error.details[0].message);
    res.send("Register");
});
router.post("/login", (req, res) => {});
export default router;

