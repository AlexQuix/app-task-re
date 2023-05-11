import dotenv from 'dotenv';
dotenv.config();

import 'regenerator-runtime';
import 'core-js';

import express from "express";
import path from "path";
import cors from "cors";
import pages from "./routes/index";
import apiRest from "./routes";
import {connectToDatabase} from "./database";
import morgan from 'morgan';

connectToDatabase();

const app = express();


// SETTINGS
app.set("port", process.env.PORT || 3000);


// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


//ROUTES
app.use(pages);
app.use("/api", apiRest);


app.listen(app.get("port"), ()=>{
    console.log("Server conected in the port " + app.get("port"));
});