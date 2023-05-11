import { PriorityLevel } from "../components/Priority";
import { IResult } from "../utils";

export interface ITask{
    _id: string;
    title: string;
    priority: PriorityLevel;
    description: string;
    created_date: Date;
}
export interface ITaskCreation{
    title: string;
    priority: PriorityLevel;
    description: string;
}

export interface ITaskSearch{
    title?: string;
    priority?: PriorityLevel;
    description?: string;
}

function buildQueryString(taskSearch:ITaskSearch){
    const queryEntries = Object.entries(taskSearch)
    let queryString = queryEntries.reduce((qs:string, [key, value]:[string, string], i)=>{
        qs += `${ (i > 0) ? "&" : "" }${ key }=${ value }`
        return qs;
    }, "");
    return queryString;
}

class TaskServices{
    async filter(taskSearch:ITaskSearch):Promise<IResult<ITask[]>>{
        try{
            let res = await fetch("/api/tasks?"+buildQueryString(taskSearch));
            let result = await res.json();
            return result;
        }catch(e){
            return {result: null};
        }
    }
    async findById(id:string):Promise<IResult<ITask>>{
        try{
            let res = await fetch("/api/tasks");
            let result = await res.json();
            return result;
        }catch(e){
            return {result: null};
        }
    }
    async update(taskId:string, updatedTask:ITaskCreation):Promise<IResult<boolean>>{
        try {
            let res = await fetch("/api/tasks/"+taskId, {
                method: "PUT",
                body: JSON.stringify({
                    title: updatedTask.title,
                    priority: updatedTask.priority,
                    description: updatedTask.description
                }),
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
    async delete(taskId:string):Promise<IResult<boolean>>{
        try {
            let res = await fetch("/api/tasks/"+taskId, {method: "DELETE"});
            let result = await res.json();
            return result;
        } catch (e) {
            return { result: false };
        }
    }
    async create(task:ITaskCreation):Promise<IResult<ITask>>{
        try{
            let res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(task),
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


export default new TaskServices();