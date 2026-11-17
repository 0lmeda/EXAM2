import { createComment } from "../services/commentService.js";
import { getPostbyID } from "../services/postService.js";

export const addComment = async(req,res) => {
    const {id} = req.params;
    const {text} = req.body;

    if (!req.user){
        return res.status(401).send("login Required");
    }

    if(!text.trim()){
        return res.status(400).send("Comment cannot be empty");
    }

    try {
        const post = await getPostbyID(id);

        if(!post) {
            return res.status(404).send("Post not found");
        }

        await createComment(id, req.user.id, text.trim());
        return res.redirect(`/posts/${id}`);
    }catch(error){
        console.error(error);
        return res.status(500).send("Error while creating comment");
    }
}