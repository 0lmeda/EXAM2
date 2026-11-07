import express from "express";
import path from "node:path";
import pageRoutes from "./routes/pageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express(); //Create application
const port = 3000;

app.use(express.json()); // read json data sent by the frontend
app.use(express.urlencoded({extended: true})); // read tdata submited through html forms
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/", pageRoutes);

app.use("/", userRoutes);


app.listen(port, ()=>{
    console.log(`server started listening on port ${port}`);
});