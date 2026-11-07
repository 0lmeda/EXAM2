import {createUser} from "../services/userService.js";

export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).send("Username and password are required for register");
    }

    try{
        const user = await createUser(username,password);
        res.status(201).json(user);
    }catch(error){
        if(error.message === "username already exists"){
            return res.status(409).send(error.message);
        }

        console.error(error);
        res.status(500).send("ERROR");
    }
}