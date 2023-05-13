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
app.use(express.static(path.join(process.cwd(), "dist", "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//ROUTES
app.get("/", (req, res)=>{
    let filePath = path.join(process.cwd(), "dist", "public", "index.html");
    res.sendFile(filePath);
})

app.use("/api", routes);

app.use((req, res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server on live");
});