import { addBookmark, removeBookmark } from "../services/bookmarkService.js";
import { getPostbyID } from "../services/postService.js";

export const saveBookmark = async(req,res) =>{
    const id = req.params.id;

   try {
        const post = await getPostbyID(id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        await addBookmark(id, req.user.id);

        return res.redirect(`/posts/${id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error saving bookmark");
    }
}

export const unsaveBookmark = async(req,res) =>{
    const id = req.params.id;

   try {
        const post = await getPostbyID(id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        await removeBookmark(id, req.user.id);

        return res.redirect(`/posts/${id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error removing bookmark");
    }
}