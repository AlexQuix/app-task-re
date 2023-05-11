import {Schema, model, ObjectId} from "mongoose";

export interface ITask {
    title: string;
    priority: string;
    description: string;
    created_date: Date;
}

const TaskSchema = new Schema({
    title: String,
    priority: String,
    description: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Task = model("Tasks", TaskSchema);
export default Task;