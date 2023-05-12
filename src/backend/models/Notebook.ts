import {Schema, model, Types} from "mongoose";

export interface INotebook{
    name: string;
}

const NotebookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: Types.ObjectId,
        ref: "Tasks"
    }] 
});


const NoteBook = model("Notebooks", NotebookSchema);
export default NoteBook;