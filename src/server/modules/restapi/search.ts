import { Request, Response, Send } from "express";
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
    async find(req: Request, res: Response) {
        const collectionArray = await collections;
        let senddata: SendData = await this.analizedQuery(req.query as RequestQuery);
        res.send(senddata);
    }
    private async analizedQuery(resQuery: RequestQuery) {
        let sendData: SendData;
        let queryTask: any[] = [
            {
                name: {
                    $regex: resQuery.name_task
                }
            },
            {
                priority: {
                    $regex: resQuery.priority
                }
            }
        ]

        if (resQuery.name_notebook) {
            let notebookArray: DataNotebook[] = await this.executeAction('notebbok', resQuery);

            notebookArray.forEach(async (notebook) => {
                queryTask.push({ _id_notebook: new ObjectId(notebook._id) });
                notebook.list_task = await this.executeAction('task', queryTask);
            })
            sendData.notebook = notebookArray;
        }
        else if (resQuery.name_task || resQuery.priority) {
            sendData.task = await this.executeAction('task', queryTask);
        }

        return sendData;
    }
    private async executeAction(action: string, query: RequestQuery | any) {
        switch (action) {
            case 'notebook':
                return await this.checkOutNotebook(query.name_notebook);
            case 'task':
                return await this.checkOutTask(query);
        }
    }
    private async checkOutTask(queryTask) {
        const [task] = await collections;
        let cursor = await task.find({ $and: queryTask });
        return await cursor.toArray();
    }
    private async checkOutNotebook(name: string) {
        const [, cltNotebook] = await collections;
        const cursor = await cltNotebook.find({
            name: {
                $regex: name
            }
        });
        return await cursor.toArray();
    }
}

export default new Filter();