import { lookForPost, publishPost, showPosts } from "../controllers/postController.js";
import { requireAuth, requireTA } from "../middleware/auth.js";
import { addComment } from "../controllers/commentController.js";
import { likePost, unlikePost } from "../controllers/likesController.js";
import { saveBookmark,unsaveBookmark } from "../controllers/bookmarkController.js";
import express from "express";

const router = express.Router();

router.get("/admin/posts/new",requireAuth,requireTA, (req,res) =>{
    res.render("admin/createPost");
});

router.get("/posts", showPosts);

router.post("/posts",requireAuth,requireTA, publishPost);

router.get("/posts/:id", lookForPost);

router.post("/posts/:id/comments", requireAuth, addComment);

router.post("/posts/:id/likes", requireAuth, likePost);

router.post("/posts/:id/unlike",requireAuth,unlikePost);

router.post("/posts/:id/bookmarks", requireAuth,saveBookmark);
router.post("/posts/:id/unbookmarks", requireAuth,saveBookmark);



export default router;