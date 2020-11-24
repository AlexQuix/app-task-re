import {Router} from "express";

// CONTROLLER
import index from "../controllers/index";

const route = Router();



// ROUTES
route.get("/", index);





export default route;