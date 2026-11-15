import { publishPost, showPosts } from "../controllers/postController.js";
import { requireAuth, requireTA } from "../middleware/auth.js";

import express from "express";

const router = express.Router();

router.get("/admin/posts/new",requireAuth,requireTA, (req,res) =>{
    res.render("admin/createPost");
});

router.get("/posts", showPosts);

router.post("/posts",requireAuth,requireTA, publishPost);

export default router;