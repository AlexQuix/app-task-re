import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import morgan from 'morgan';
import routes from "./routes";
import {connectToDatabase} from "./database";

connectToDatabase();

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ROUTES
app.get("/home", (req, res)=>{
    let filePath = path.join(__dirname, "public", "index.html");
    console.log(filePath)
    res.sendFile(filePath);
})

app.use("/api", routes);

app.use((req, res)=>{
    res.redirect("/home");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server on live");
});