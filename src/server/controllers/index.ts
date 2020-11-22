import {Request, Response} from "express";
import {Db} from "mongodb";
import client from "../database";


let db:Db;
(async function(){
    await client.connect().catch(e=>console.log(e));
    db = client.db("app-task");
})();

abstract class TaskCRUD{
    async read(req:Request, res:Response){
        console.log(req.params);
        res.send("Encontratado");
    }
    async create(req:Request, res:Response){
        const collection = await db.collection("task");
        console.log(req.body);
        res.send("Creado");
    }
}

class Controller extends TaskCRUD{
    index(req: Request, res: Response){
        res.render("index");
    }
}

export default new Controller();