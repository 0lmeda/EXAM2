import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {Comments} from "../models/comments.js";

const dataPath = path.join(import.meta.dirname, "../data/comments.json");

export const createComment = async (postID, userID, text)=>{
    const data = await fs.readFile(dataPath,"utf8");

    const comments = JSON.parse(data);

    const id = crypto.randomUUID();

    const newComment = new Comments(id,postID, userID, text);
    comments.push(newComment);
    await fs.writeFile(dataPath,JSON.stringify(comments, null,2));
    return newComment;
}


export const getCommentByPost = async(postID)=>{
    const data = await fs.readFile(dataPath,"utf8");
    const comments = JSON.parse(data);
    return comments.filter(comment=>comment.postID === postID);
}