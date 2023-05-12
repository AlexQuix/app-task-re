import { Request, Response } from "express";
import { Task, ITask } from "../models";

function buildQuery(rawQuery){
    const query = { $and: [] };

    if (rawQuery.priority) {
        query.$and.push({priority: rawQuery.priority});
    }

    if (rawQuery.title) {
        query.$and.push({ title: { $regex: rawQuery.title, $options: 'i' } });
    }

    if(rawQuery.created_date){
        console.log(new Date(rawQuery.created_date).toISOString());
        query.$and.push({ created_date: {$gte: new Date(rawQuery.created_date).toISOString()} });
    }

    return query;
}

export default class TaskController {
    static async findOne(req: Request, res: Response) {
        try{
            let { id } = req.params;
            let task = await Task.findOne({ _id: id });
            res.send({result: task});
        }catch(e){
            res.send({result: null});
        }
    }
    static async find(req: Request, res: Response) {
        try{
            let query = buildQuery(req.query);
            console.log(query)
            let tasks = await Task.find(query);
            res.send({result: tasks});
        }catch(e){
            res.send({result: []});
        }
    }
    static async create(req: Request, res: Response) {
        try{
            let {title, priority, description} = req.body as ITask;
            let createTask = new Task({
                title, priority, description
            });
    
            await createTask.save();
            res.send({result: createTask});
        }catch(e){
            res.send({result: null});
        }
    }
    static async update(req: Request, res: Response) {
        try{
            let {id} = req.params;
            let {title, priority, description} = req.body as ITask;
    
            await Task.updateOne({_id: id}, { title, priority, description });
            res.send({result: true});
        }catch(e){
            res.send({result: false});
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            let { id } = req.params;
            await Task.deleteOne({_id: id});

            res.send({result: true});
        } catch (error) {
            res.send({result: false});
        }
    }
}
