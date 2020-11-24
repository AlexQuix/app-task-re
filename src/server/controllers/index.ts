import { Request, Response } from "express";



    async function index(req: Request, res: Response) {
        res.render("index");
    }



export default index;