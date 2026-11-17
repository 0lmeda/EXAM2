import { addLike, removeLike } from "../services/likeService.js";
import { getPostbyID } from "../services/postService.js";

export const likePost = async (req,res)=>{
    const {id} = req.params;

    if(!req.user){
        return res.status(401).send("login required");
    }

    try{
        const post = await getPostbyID(id);
        if(!post){
            return res.status(404).send("POST NOT FOUND");
        }

        await addLike(id,req.user.id);

        return res.redirect(`/posts/${id}`);

    }catch(error){
        console.error(error);
        return res.status(500).send("Error liking post");
    }
}

export const unlikePost = async (req,res) =>{
    const {id} = req.params;

    if(!req.user){
        return res.status(401).send("Login required");
    }

    try{
        const post = await getPostbyID(id);
        if(!post){
            return res.status(404).send("Post not found");
        }

        await removeLike(id, req.user.id);

        return res.redirect(`/posts/${id}`);
    }catch(error){
        console.error(error);
        return res.status(500).send("Error removing like");
    }
}