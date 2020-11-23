import { Request, Response } from "express";
import Task from '../modules/restapi';

class Controller extends Task {
    async index(req: Request, res: Response) {
        res.render("index");
    }
}


export default new Controller();