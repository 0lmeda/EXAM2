import express from "express"
import { getUsers, registerUser } from "../controllers/userController.js";
import passport from "passport";
import { requireAuth,requireTA } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local",{ failureRedirect: "/login.html?error=1"}), (req,res) =>{
    res.redirect("/");
});

router.get("/admin/users", requireAuth, requireTA,getUsers);


//Chatgpt was used to generate this function because i had no idea how to log out from a session.
router.post("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy((error) => {
            if (error) {
                return next(error);
            }

            res.clearCookie("connect.sid");
            return res.redirect("/login.html");
        });
    });
});
export default router;