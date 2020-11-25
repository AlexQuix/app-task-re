import RESPONSIVE from './responsive'
import App from "../app";
import TASK from '../task';

// INTERFACES
type IContentTask = {
    _id_notebook: string;
    title: string;
    priority: string;
    description: string;
}
interface IContentNotebook {
    _id:string;
    name:string;
}

class Form {
    private contNotebook:HTMLDivElement;
    private btnVisibleForm:HTMLButtonElement;
    private NotebookID:string;
    private notebookData:IContentNotebook;

    private static contParent:HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task");
    private static contForm:HTMLFormElement = Form.contParent.querySelector<HTMLFormElement>("form");
    private static btnCreateTask = Form.contForm.querySelector<HTMLButtonElement>("#btn-add-task");
    private static btnClose = Form.contForm.querySelector<HTMLButtonElement>("#btn-close");
    private static isVisible:boolean = false;

    constructor(notebook:IContentNotebook){
        this.notebookData = notebook;
        this.contNotebook = document.getElementById('notebook-' + this.notebookData._id) as HTMLDivElement;
        this.btnVisibleForm = this.contNotebook.querySelector<HTMLButtonElement>("#btn-create-new-task");
        this.start();
    }
    private start() {
        this.btnVisibleForm.onclick = this.visible.bind(this);
        Form.btnCreateTask.onclick = (e)=>{
            e.preventDefault();
            TASK.createTask(this.notebookData);
        }
        Form.btnClose.onclick = Form.hidden
    }
    static getValuesForm(id:string): IContentTask {
        let title = Form.contForm.querySelector<HTMLInputElement>("#title").value;
        let priority = Form.contForm.querySelector<HTMLSelectElement>("#priority").value;
        let description = Form.contForm.querySelector<HTMLTextAreaElement>("#description").value;
        let _id_notebook = id;

        return {_id_notebook, title, priority, description };
    }
    private visible(e): void {       
        e.preventDefault();
        Form.contForm.querySelector<HTMLSpanElement>("#name-notebook").innerHTML = this.notebookData.name;
        if(!Form.isVisible){
            Form.isVisible = true;
            App.closeEverything();
            RESPONSIVE.visibleFormTask();
        }
    }
    static async fetchData(method: string, params: string) {
        let res = await fetch(`/api/notebooks/${params}`, {
            method
        });
        let json = await res.json();
        return json;
    }
    static async sendData(method: string, body: string): Promise<any> {
        let res = await fetch(`/api/tasks`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
        let json = await res.json();
        if(method === 'PUT'){
            return json;
        }
        return json.ops[0];
    }
    private static hidden(e){
            e.preventDefault();
            RESPONSIVE.visibleFormTask(); 
            Form.isVisible = false;
    }
}

export default Form;