import 'regenerator-runtime';
import 'core-js';

import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


// INITIALIZERS
const app = express();


// SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"));
app.use(cors());


//ROUTES
import {route, taskRoute} from "./routes/index";
app.use(route);
app.use("/api/task", taskRoute);


app.listen(app.get("port"), ()=>{
    console.log("Server conected in the port " + app.get("port"));
});