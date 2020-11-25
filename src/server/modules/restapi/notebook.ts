import { Request, Response } from "express";
import { Db, ObjectId, Collection } from "mongodb";
import collections from "../../database";

interface Notebook{
    _id: ObjectId;
    name: string;
}

class Notebook{
    async find(req: Request, res: Response) {
        const [, notebook] = await collections;
        let cursor = await notebook.find({});
        let result = await cursor.toArray();
        res.send(result);
    }
    async findOne(req: Request, res: Response) {
        const [tasks,] = await collections;
        let id = req.params.id
        let cursor = await tasks.find({_id_notebook: id});
        let result = await cursor.toArray();
        res.send(result);
    }
    async create(req: Request, res: Response) {
        const [, notebooks] = await collections;
        let answer = await notebooks.insertOne(req.body);
        res.send(answer);
    }
    async update(req: Request, res: Response){
        const [, notebooks] = await collections;
        let query = {
            _id: new ObjectId(req.body._id)
        };
        let update = {
            $set: {
                name: req.body.name
            }
        }
        let answer = await notebooks.updateOne(query,update);
        res.send(answer.result);
    }
    async delete(req: Request, res: Response){
        const [tasks, notebooks] = await collections;
        let query = {_id: new ObjectId(req.params.id)};
        let queryTask = {_id_notebook: req.params.id};
        let answer = await (await notebooks.deleteOne(query)).result;
        await (await tasks.deleteMany(queryTask)).result;
        res.send(answer);
    }
}

export default new Notebook();