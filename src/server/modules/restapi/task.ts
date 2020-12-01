import { Request, Response } from "express";
import { Db, ObjectID, Collection, ObjectId } from "mongodb";
import collections from "../../database";

interface Task {
    title: string,
    priority: string,
    description: string,
    date: string;
    _id_notebook: string
}

class Tasks {
    async findOne(req: Request, res: Response) {
        const [tasks,] = await collections;
        let { id } = req.params;
        const result = await tasks.find({ _id: new ObjectId(id) });
        res.send(result);
    }
    async find(req: Request, res: Response) {
        const [tasks,] = await collections;
        const cursor = await tasks.find({});
        const result = await cursor.toArray();
        res.send(result);
    }
    async create(req: Request, res: Response) {
        const [tasks,] = await collections;
        req.body.date = new Date().toLocaleString();
        const result = await tasks.insertOne(req.body);
        res.send(result);
    }
    async updata(req: Request, res: Response) {
        const [tasks,] = await collections;
        let { _id, title, description, priority } = req.body;
        let query = { _id: new ObjectId(_id) };
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
    async delete(req: Request, res: Response) {
        const [tasks,] = await collections;
        let { id } = req.params;
        const result = await tasks.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
    }
}


export default new Tasks();