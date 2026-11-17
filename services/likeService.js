import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {Like} from "../models/likes.js"

const dataPath = path.join(import.meta.dirname, "../data/likes.json");

export const addLike = async (postID, userID)=>{
    const data = await fs.readFile(dataPath, "utf8");
    const likes = JSON.parse(data);

    const existingLike = likes.find(like =>like.postID === postID && like.userID === userID);

    if (existingLike){
        return false;
    }

    const like = new Like(crypto.randomUUID(), postID, userID);
    likes.push(like);

    await fs.writeFile(dataPath, JSON.stringify(likes,null,2));

    return true;
}

export const getLikesByPost = async(postID)=>{
    const data = await fs.readFile(dataPath,"utf8");
    const likes = JSON.parse(data);

    return likes.filter(like => like.postID === postID);
}

export const removeLike = async(postID,userID)=>{
    const data = await fs.readFile(dataPath,"utf8");
    const likes = JSON.parse(data);

    const updatedLikes = likes.filter(like =>!(like.postID === postID && like.userID === userID));

    await fs.writeFile(dataPath,JSON.stringify(updatedLikes,null,2));

    return updatedLikes.length < likes.length;
}