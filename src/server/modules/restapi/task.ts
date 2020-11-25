import { Request, Response } from "express";
import { Db, ObjectID, Collection, ObjectId } from "mongodb";
import collections from "../../database";

interface Task {
    title: string,
    priority: string,
    description: string,
    _id_notebook: string
}

class Tasks {
    async find(req: Request, res: Response) {
        const [tasks,] = await collections;
        const cursor = await tasks.find({});
        const result = await cursor.toArray();
        res.send(result);
    }
    async create(req: Request, res: Response) {
        const [tasks,] = await collections;
        const result = await tasks.insertOne(req.body);
        res.send(result);
    }
    async updata(req: Request, res: Response) {
        const [tasks,] = await collections;
        let {_id, title, description, priority} = req.body;
        let query = {_id: new ObjectId(_id)};
        let data = {
            $set: {
                title,
                description,
                priority
            }
        };
        const result = await tasks.updateOne(query, data);
        res.send(result);
    }
}


export default new Tasks();