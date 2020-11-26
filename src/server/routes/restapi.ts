import { Router } from "express";

const route = Router();

// REST API OF TASKS
import Task from '../modules/restapi/task'

route.get("/tasks/:id", Task.findOne);
route.get("/tasks", Task.find);
route.post("/tasks", Task.create);
route.put('/tasks', Task.updata);
route.delete('/tasks/:id', Task.delete);


// REST API OF NOTEBOOK
import Notebook from '../modules/restapi/notebook';

route.get("/notebooks", Notebook.find);
route.get("/notebooks/:id", Notebook.findOne);
route.post("/notebooks", Notebook.create);
route.put('/notebooks', Notebook.update);
route.delete('/notebooks/:id', Notebook.delete);


// REST API OF SEARCH
import Search from "../modules/restapi/search";
route.get('/search', Search.find);

export default route;