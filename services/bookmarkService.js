import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { Bookmark } from "../models/bookmarks.js";

const dataPath = path.join(import.meta.dirname, "../data/bookmarks.json");


export const addBookmark = async(postID, userID)=>{
    const data = await fs.readFile(dataPath, "utf8");
    const bookmarks = JSON.parse(data);

    for(let i = 0; i<bookmarks.length; i++){
        if(bookmarks[i].postID === postID && bookmarks[i].userID === userID){
            return false;
        }
    }

    const bookmark = new Bookmark(crypto.randomUUID(), postID, userID);

    bookmarks.push(bookmark);

    await fs.writeFile(dataPath, JSON.stringify(bookmarks, null,2));

    return true;
}

export const removeBookmark = async(postID, userID)=>{
    const data = await fs.readFile(dataPath, "utf8");
    const bookmarks = JSON.parse(data);

    const updatedBookmarks = [];

    for(let i =0; i< bookmarks.length; i++){
        if (bookmarks[i].postID !== postID ||bookmarks[i].userID !== userID) {
            updatedBookmarks.push(bookmarks[i]);
        }
    }

    await fs.writeFile(dataPath, JSON.stringify(updatedBookmarks,null,2));

    return updatedBookmarks.length < bookmarks.length;
}

export const getBookmarksByPost = async (postID)=>{
    const data = await fs.readFile(dataPath,"utf8");
    const bookmarks = JSON.parse(data);

    return bookmarks.filter(bookmark => bookmark.postID === postID);
}