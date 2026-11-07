import fs from "node:fs/promises"; //fs and a promised base to use async and await
import path from "node:path"; // module to build pathway
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import {User} from "../models/users.js";


const dataPath = path.join(import.meta.dirname, "../data/users.json");

export const createUser = async (username, password) =>{
    const data = await fs.readFile(dataPath, 'utf8'); // await waits for the read operation to finish.

    const users = JSON.parse(data); // convert it into an array

    const existingUser = users.find(user => user.username === username);

    if(existingUser){
        throw new Error("Username already exists");
    }
    const  saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const id = crypto.randomUUID(); // Generate unique identifier
    const newUser = new User(id, username, hashedPassword); 
    users.push(newUser);
    await fs.writeFile(dataPath, JSON.stringify(users, null, 2)); // Null, 2 is to 2 space identation
    return{
        id:newUser.id,
        username: newUser.username,
        role: newUser.role
    }
};