import express from "express"
import { getUsers, registerUser } from "../controllers/userController.js";
import passport from "passport";
import { requireAuth,requireTA } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), (req,res) =>{
    res.status(200).json({
        message: "login successful",
        user: req.user
    });
});

router.get("/admin/users", requireAuth, requireTA,getUsers, (req, res) => {
});

export default router;