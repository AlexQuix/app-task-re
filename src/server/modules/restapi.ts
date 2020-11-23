import { Request, Response } from "express";
import { Db } from "mongodb";
import client from "../database";

let db: Db
(async function () {
    await client.connect().catch(e => console.log(e));
    db = client.db("app-task");
    console.log('DataBase conected in the port: ', process.env.MONGODB_URI);
})();
class Tasks {
    async read(req: Request, res: Response) {
        let tasks = db.collection('tasks');

        res.send("Encontrado");
    }
    async create(req: Request, res: Response) {
        const tasks = db.collection('tasks');
        const result = await tasks.insertOne(req.body);
        res.send(result);
    }
}

export default Tasks;