import express from "express";
import path from "node:path";

const router = express.Router();

router.get("/" , (req,res) =>{
    res.render("home", {user:req.user});
});

export default router;