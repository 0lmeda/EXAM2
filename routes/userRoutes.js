import express from "express"
import { login, registerUser } from "../controllers/userController.js";
import passport from "passport";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local", (req,res) =>{
    res.status(200).json({
        message: "login successful",
        user: req.user
    })
}));
export default router;