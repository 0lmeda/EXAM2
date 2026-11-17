import { createPost, getAllPosts, incrementViews } from "../services/postService.js";
import { getCommentByPost } from "../services/commentService.js";
export const showPosts = async(req,res) =>{
    try {
        const posts= await getAllPosts();
        
        return res.status(200).render("posts", {posts});
    }catch(error){
        console.error(error);
        return res.status(500).send("Error loading posts");
    }
};

export const publishPost = async (req,res) =>{

    const{title,topic,content,img} = req.body;

    if(!title || !topic || !content){
        return res.status(400).send("Title, topic and content are required");
    }

    if(!req.user){
        return res.status(400).send("login required");
    }
    const authorID = req.user.id;



    try{
        const post = await createPost(authorID, title,topic,content,img);
        return res.status(201).json(post);
    }catch(error){
        console.error(error);
        return res.status(500).send("Error creating post");
    }

};

export const lookForPost = async(req,res) =>{
    const id = req.params.id;

    try{
        const post = await incrementViews(id);

        if(!post){
            return res.status(404).send("not found");
        }
        const comments = await getCommentByPost(id);

        return res.status(200).render("post", {post,comments});
    }catch(error){
        console.error(error);
        return res.status(500).send("Error loading post");
    }
}