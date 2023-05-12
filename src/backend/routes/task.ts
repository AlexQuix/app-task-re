import { Router } from "express";
import {TaskController} from "../controllers";

const route = Router();

route.get("/tasks/:id", TaskController.findOne);
route.get("/tasks", TaskController.find);
route.post("/tasks", TaskController.create);
route.put('/tasks/:id', TaskController.update);
route.delete('/tasks/:id', TaskController.delete);

export default route;