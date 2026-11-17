import express from "express";
import path from "node:path";
import pageRoutes from "./routes/pageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import session from "express-session"; //To manage login sessiojn using cookies
import passport from "passport"; // handles authentication
import "./middleware/passportConfig.js"; //local strategy, serializeUser and deserializeUser
const app = express(); //Create application
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(express.json()); // read json data sent by the frontend
app.use(express.urlencoded({extended: true})); // read tdata submited through html forms
app.use(express.static(path.join(import.meta.dirname, "public")));


app.use(session({
    secret: "random", // used to sign in
    resave: false, //Avoid saving unchanged session
    saveUninitialized: false //Avoid save new empty sesions
}));

app.use(passport.initialize());
app.use(passport.session());



app.use((req,res,next) =>{
    res.locals.user = req.user;
    next();
});

app.use("/", pageRoutes);

app.use("/", userRoutes);

app.use("/", postRoutes);



app.listen(port, ()=>{
    console.log(`server started listening on port ${port}`);
});