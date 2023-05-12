import { Router } from "express";
import {NotebookController} from "../controllers";

const route = Router();

route.get("/notebooks", NotebookController.FilterByName);
route.get("/notebooks/:id", NotebookController.findById);
route.post("/notebooks", NotebookController.create);
route.put('/notebooks/:id', NotebookController.update);
route.delete('/notebooks/:id', NotebookController.delete);

route.put('/notebooks/task/:id', NotebookController.addTaskToNotebook);
route.delete('/notebooks/task/:id', NotebookController.removeTaskFromNotebook);

export default route;