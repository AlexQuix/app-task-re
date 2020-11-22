import {Router} from "express";

// CONTROLLER
import Controller from "../controllers/index";

const route = Router();
const taskRoute = Router();


// ROUTES
route.get("/", Controller.index);


// CRUD OPERATION
taskRoute.get("/:id", Controller.read);
taskRoute.post("/", Controller.create);


export {route, taskRoute};