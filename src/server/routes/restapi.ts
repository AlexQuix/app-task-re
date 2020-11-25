import { Router } from "express";

const route = Router();

// REST API OF TASKS
import Task from '../modules/restapi/task'

route.get("/tasks/:id", Task.findOne);
route.get("/tasks", Task.find);
route.post("/tasks", Task.create);
route.put('/tasks', task.updata);
route.delete('/tasks/:id', task.delete);


// REST API OF NOTEBOOK
import Notebook from '../modules/restapi/notebook';
import task from "../modules/restapi/task";

route.get("/notebooks", Notebook.find);
route.get("/notebooks/:id", Notebook.findOne);
route.post("/notebooks", Notebook.create);
route.put('/notebooks', Notebook.update);
route.delete('/notebooks/:id', Notebook.delete);

export default route;