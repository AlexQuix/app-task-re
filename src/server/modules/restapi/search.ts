import { query, Request, Response, Send } from "express";
import { Db, ObjectID, Collection, ObjectId } from "mongodb";
import collections from "../../database";

type RequestQuery = {
    name_notebook?: string;
    name_task?: string;
    priority?: string;
}
type SendData = {
    notebook: DataNotebook[];
    task: DataTask[];
}
type DataNotebook = {
    _id?: string;
    name?: string;
    list_task?: DataTask[];
}
type DataTask = {
    _id?: string;
    name?: string;
    priority?: string;
    description?: string;
}

class Filter {
    static queryTaks = {}
    async find(req: Request, res: Response) {
        let senddata: SendData = await Filter.analizedQuery(req.query as RequestQuery);
        res.send(senddata);
    }
    static async analizedQuery(resQuery: RequestQuery) {
        let sendData = {} as SendData;
        let queryTask:any = {
            $and: [
                {
                    title: {
                        $regex: (resQuery.name_task)?resQuery.name_task:""
                    }
                },
                {
                    priority: {
                        $regex: ""
                    }
                }
            ]
        };
        if (resQuery.name_notebook) {
            let datanotebook: DataNotebook[] = [];
            let notebookArray: DataNotebook[] = await Filter.executeAction('notebook', resQuery);
            if(notebookArray[0]){
                if(resQuery.name_task || resQuery.priority){
                    for(let notebook of notebookArray){
                        queryTask.$and.push({ _id_notebook: notebook._id });
                        notebook.list_task = await Filter.executeAction('task', queryTask);
                        datanotebook.push(notebook);
                    }
                }else{
                    for(let notebook of notebookArray){
                        queryTask = { _id_notebook: notebook._id.toString() };
                        notebook.list_task = await Filter.executeAction('task', queryTask);
                        datanotebook.push(notebook);
                    }   
                }
                sendData.notebook = datanotebook;
            }
        }
        else if (resQuery.name_task || resQuery.priority) {
            sendData.task = await Filter.executeAction('task', queryTask);
        }

        return sendData;
    }
    static async executeAction(action: string, query: RequestQuery | any) {
        switch (action) {
            case 'notebook':
                return await Filter.checkOutNotebook(query.name_notebook);
            case 'task':
                return await Filter.checkOutTask(query);
        }
    }
    static async checkOutTask(queryTask) {
        console.log(queryTask)
        const [task] = await collections;
        let cursor = await task.find(queryTask);
        let taskArray = await cursor.toArray();
        return taskArray;
    }
    static async checkOutNotebook(name: string) {
        const [, cltNotebook] = await collections;
        const cursor = await cltNotebook.find({
            name: {
                $regex: name
            }
        });
        let notebookArray = await cursor.toArray();
        return notebookArray;
    }
}

export default new Filter();