import express from "express";
import path from "node:path";
import pageRoutes from "./routes/pageRoutes.js"

const app = express(); //Create application
const port = 3000;

app.use(express.json()); // read json data sent by the frontend


app.use(express.static("public")); //Access the css, img and fronend js

app.get("/", pageRoutes);




app.listen(port, ()=>{
    console.log(`server started listening on port ${port}`);
});