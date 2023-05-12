import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Notebook, INotebook } from "../models";

export default class NotebookController {
    static async findById(req: Request, res: Response) {
        try{
            let { id } = req.params;
            let notebooks = await Notebook.findOne({ _id: id })
                                        .populate("tasks");
            res.send({result: notebooks});
        }catch(e){
            res.send({result: null});
        }
    }
    static async FilterByName(req: Request, res: Response) {
        try{
            let {name} = req.query;
            let tasks = await Notebook.find({name: {$regex: name}});
            res.send({result: tasks});
        }catch(e){
            res.send({result: []});
        }
    }
    static async create(req: Request, res: Response) {
        try{
            let {name} = req.body as INotebook;
            let createTask = new Notebook({ name });
    
            await createTask.save();
            res.send({result: createTask});
        }catch(e){
            res.send({result: null});
        }
    }
    static async update(req: Request, res: Response) {
        try{
            let {id} = req.params;
            let {name} = req.body as INotebook;
    
            await Notebook.updateOne({_id: id}, { name });
            res.send({result: true});
        }catch(e){
            res.send({result: false});
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            let { id } = req.params;
            await Notebook.deleteOne({_id: id});

            res.send({result: true});
        } catch (error) {
            res.send({result: false});
        }
    }

    

    static async addTaskToNotebook(req: Request, res: Response){
        try{
            let {id} = req.params;
            let {taskId} = req.body;
            let taskObjectId = new ObjectId(taskId as string);

            await Notebook.updateOne({_id: id}, {$push: {tasks: taskObjectId}});
            res.send({result: true});
        }catch(e){
            console.error(e);
            res.send({result: false});
        }
    }

    static async removeTaskFromNotebook(req: Request, res: Response){
        try{
            let {id} = req.params;
            let {taskId} = req.body;
            let taskObjectId = new ObjectId(taskId);
            
            await Notebook.updateOne({_id: id}, {$pull: {tasks: taskObjectId}});
            res.send({result: true});
        }catch(e){
            res.send({result: false});
        }
    }
}
