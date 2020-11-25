import App from "../app";
import Task from "../task";
import TASK from '../task';

// INTERFACES
type IContentTask = {
    _id_notebook: string;
    title: string;
    priority: string;
    description: string;
}
interface IContentNotebook {
    _id: string;
    name: string;
}

class Form {
    private contNotebook: HTMLDivElement;
    private btnVisibleForm: HTMLButtonElement;
    private notebookData: IContentNotebook;

    private static contParent: HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task");
    private static contForm: HTMLFormElement = Form.contParent.querySelector<HTMLFormElement>("form");
    private static btnClose = Form.contForm.querySelector<HTMLButtonElement>("#btn-close");
    private static isVisible: boolean = false;
    private static btnCreateTask: HTMLButtonElement = Form.contForm.querySelector<HTMLButtonElement>("#btn-add-task");;

    constructor(notebook: IContentNotebook) {
        console.log('form: \n' + JSON.stringify(notebook, null, 2));
        this.notebookData = notebook;
        this.contNotebook = document.getElementById('notebook-' + this.notebookData._id) as HTMLDivElement;
        this.btnVisibleForm = this.contNotebook.querySelector<HTMLButtonElement>("#btn-create-new-task");
        this.start();
    }
    private start() {
        this.btnVisibleForm.onclick = this.visible.bind(this);
        Form.btnClose.onclick = Form.hidden
    }
    private visible(e): void {
        e.preventDefault();
        Form.contForm.querySelector<HTMLSpanElement>("#name-notebook").innerHTML = this.notebookData.name;
        Form.btnCreateTask.onclick = Form.handleBtnCreateTask.bind(this);
        if (!Form.isVisible) {
            Form.isVisible = true;
            App.closeEverything();
            Form.Responsive();;
        }
    }
    static Responsive(){
        // if(getComputedStyle(Form.contParent).right === "0px" || getComputedStyle(Form.contParent).right === "40px"){
        //     Form.contParent.style.right = "-110%";
        // }else{
            if(matchMedia("(max-width:500px)").matches){
                Form.contParent.style.right = "0px";
            }else{
                Form.contParent.style.right = "40px";
            }
        //  }
    }
    static getValuesForm(id: string): IContentTask {
        let title = Form.contForm.querySelector<HTMLInputElement>("#title").value;
        let priority = Form.contForm.querySelector<HTMLSelectElement>("#priority").value;
        let description = Form.contForm.querySelector<HTMLTextAreaElement>("#description").value;
        let _id_notebook = id;

        Form.deleteValuesForm();
        return { _id_notebook, title, priority, description };
    }
    static deleteValuesForm(){
        Form.contForm.reset();
    }
    static async fetchData(method: string, params: string = '', uri = '/api/notebooks/') {
        let res = await fetch(uri + params, {
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
        if (method === 'PUT') {
            return json;
        }
        return json.ops[0];
    }
    private static hidden(e?) {
        (e.target)?e.preventDefault():undefined;
        Form.contParent.style.right = "-110%";
        Form.isVisible = false;
    }
    private static handleBtnCreateTask(this,e){
        console.log(this)
        e.preventDefault();
        TASK.createTask(this.notebookData);
        Form.isVisible = false;
        Form.hidden();
    }
}

export default Form;