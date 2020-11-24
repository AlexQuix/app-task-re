import {Router} from "express";

const route = Router();

// REST API OF TASKS
import Task from '../modules/restapi/task'

route.get("/tasks", Task.find);
route.post("/tasks", Task.create);


// REST API OF NOTEBOOK
import Notebook from '../modules/restapi/notebook';

route.get("/notebooks", Notebook.find);
route.get("/notebooks/:id", Notebook.findOne);
route.post("/notebooks", Notebook.create);
route.put('/notebooks', Notebook.update);
route.delete('/notebooks/:id', Notebook.delete);

export default route;