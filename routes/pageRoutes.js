import express from "express";
import path from "node:path";

const router = express.Router();

router.get("/" , (req,res) =>{
    res.sendFile(path.join(import.meta.dirname, "../public/login.html"));
});

export default router;