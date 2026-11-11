import passport from "passport"; // Authentication library
import { Strategy as LocalStrategy } from "passport-local"; //Handle username and password
import { loginUser, getUserByID} from "../services/userService.js"; 

passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
        const user = await loginUser(username,password);

        return done(null,user); //Loggin sucessful
    }catch (error){
        //Invalid password or username
        if(error.message === "invalid username or password"){
            return done(null, false, {
                message: "Invalid username or password"
            });
        }




            return done(error); // Internal error
    }



})
);

passport.serializeUser((user,done) =>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done) =>{
    try {
        const user = await getUserByID(id);
        return done(null, user);
    }catch(error){
        return done(error);
    }
});