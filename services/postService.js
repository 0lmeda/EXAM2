import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {Post} from "../models/posts.js";


const dataPath = path.join(import.meta.dirname, "../data/posts.json");

export const getAllPosts = async() =>{
    const data = await fs.readFile(dataPath, "utf8");
    const posts = JSON.parse(data);

    return posts;
};

export const getPostbyID = async(id) =>{
    const data = await fs.readFile(dataPath, "utf8");
    const posts = JSON.parse(data);

    const post = posts.find(p => p.id === id);

    if(!post){
        return null;
    }
    return post;
}

export const createPost = async(authorID, title, topic, content, img) =>{
    const data = await fs.readFile(dataPath, "utf8");
    const posts = JSON.parse(data);
    
    const id = crypto.randomUUID();

    const newPost = new Post(id,authorID,title,topic,content,img);
    posts.push(newPost);
    await fs.writeFile(dataPath, JSON.stringify(posts, null,2));
    return{
        id: newPost.id,
        authorID: newPost.authorID,
        title: newPost.title,
        topic: newPost.topic,
        content: newPost.content,
        img: newPost.image
    }
}

export const incrementViews = async(id)=>{
    const data = await fs.readFile(dataPath,"utf8");
    const posts = JSON.parse(data);

    const post = posts.find(p => p.id === id);
    
    if(!post){
        return null;
    }

    post.viewCount = (post.viewCount || 0) +1;

    await fs.writeFile(dataPath, JSON.stringify(posts,null,2));

    return post;
}