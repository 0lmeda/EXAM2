import {createUser} from "../services/userService.js";
import {loginUser} from "../services/userService.js";
import { getAllUsers } from "../services/userService.js";
export const registerUser = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        return res.status(400).send("Username and password are required for register");
    }

    try{
        const user = await createUser(username,password);
        return res.redirect("/posts")
    }catch(error){
        if(error.message === "Username already exists"){
            return res.status(409).send(error.message);
        }

        console.error(error);
        res.status(500).send("ERROR");
    }
}

export const login = async(req,res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send("username and password are required");
    }

    try{
        const user = await loginUser(username,password);

        return res.status(200).json(user);
    }catch(error){
        if (error.message === "Invalid username or password"){
            return res.status(401).send(error.message);
        }
        console.error(error);
        return res.status(500).send("Internal server error");

    }
}

export const getUsers = async (req,res)=>{
    try{
        const users = await getAllUsers();

        return res.status(200).render("admin/users", {users});
    }catch(error){
        console.log(error);
        return res.status(500).send("Server Error");
    }
}