import { IResult } from "../utils";
import { ITask } from "./task";

export interface INotebook{
    _id: string;
    name: string;
    tasks: ITask[]
}
export interface INotebookCreate{
    name: string;
}

class NotebookServices{
    async filterByName(name:string = ""):Promise<IResult<INotebook[]>>{
        try{
            let res = await fetch("/api/notebooks?name="+name);
            let data = await res.json() as IResult<INotebook[]>;
            return data;
        }catch(e){
            return {result: null};
        }
    }
    async findById(id:string):Promise<IResult<INotebook>>{
        try{
            let res = await fetch("/api/notebooks/"+id);
            let data = await res.json() as IResult<INotebook>;
            return data;
        }catch(e){
            return {result: null};
        }
    }
    async update(id:string, updatedNotebook:INotebook):Promise<IResult<boolean>>{
        try {
            let res = await fetch("/api/notebooks/"+id, {
                method: "PUT",
                body: JSON.stringify(updatedNotebook),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            let result = await res.json();
            return result;
        } catch (e) {
            return { result: false };
        }
    }
    async delete(id:string):Promise<IResult<boolean>>{
        try {
            let res = await fetch("/api/notebooks/"+id, { method: "DELETE" });
            let result = await res.json();
            return result;
        } catch (e) {
            return { result: false };
        }
    }
    async create({name}:INotebookCreate):Promise<IResult<INotebook>>{
        try{
            let res = await fetch("/api/notebooks/", {
                method: "POST",
                body: JSON.stringify({name}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let result = await res.json();
            return result;
        }catch(e){
            return {result: null};
        }
    }

    async addTaskToNotebook(notebookId:string, taskId:string){
        try{
            let res = await fetch("/api/notebooks/task/" + notebookId, {
                method: "PUT",
                body: JSON.stringify({taskId}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let result = await res.json();
            return result;
        }catch(e){
            return {result: null};
        }
    }

    async completeTask(notebookId:string, taskId:string){
        try{
            let res = await fetch("/api/notebooks/task/" + notebookId, {
                method: "DELETE",
                body: JSON.stringify({taskId}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let result = await res.json();
            return result;
        }catch(e){
            return {result: null};
        }
    }
}


export default new NotebookServices();