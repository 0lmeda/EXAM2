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
        throw new Error("invalid username or password");
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

export const loginUser = async (username, password) =>{
    const data = await fs.readFile(dataPath, `utf8`);

    const users = JSON.parse(data);

    const user = users.find(u => u.username === username);

    if(!username){
        throw new Error("Username doesnt exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if(!passwordMatch){
        throw new Error ("invalid username or password")
    }

    return {
        id: user.id,
        username: user.username,
        role: user.role
    }
};



export const getUserByID = async (id) =>{
    const data = await fs.readFile(dataPath, `utf8`);

    const users = JSON.parse(data);

    const user = users.find(u => u.id === id);

    if(!user){
        return null;
    }

    return{
        id: user.id,
        username: user.username,
        role: user.role
    }
};