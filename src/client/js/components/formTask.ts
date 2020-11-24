import RESPONSIVE from './responsive'
import App from "../app";

// INTERFACES
interface IContentTask {
    notebook: string;
    title: string;
    priority: string;
    description: string;
}

class Form {
    constructor(){
        this.start();
    }
    private start() {
        this.visible();
    }
    private btnCreateTask() {
        let btnAddTask = document.querySelector<HTMLButtonElement>("#container-task > #form-create-new-task > form > #btn-add-task");
        btnAddTask.onclick = (e) => {
            debugger;
            e.preventDefault();
            // let form = TASK.getFormTask();
            // this.addTaksInsideNotebook(form);
            // App.closeAll();
        }
    }
    private getForm(): IContentTask {
        let formTaks = document.querySelector<HTMLFormElement>("#container-task > #form-create-new-task > form");

        let notebook = formTaks.querySelector<HTMLInputElement>("#notebook").value;
        let title = formTaks.querySelector<HTMLInputElement>("#title").value;
        let priority = formTaks.querySelector<HTMLSelectElement>("#priority").value;
        let description = formTaks.querySelector<HTMLTextAreaElement>("#description").value;

        return { notebook, title, priority, description };
    }
     sendForm() {
        let btnAddTask = document.querySelector<HTMLButtonElement>("#container-task > #form-create-new-task > form > #btn-add-task");
        btnAddTask.onclick = (e) => {
            e.preventDefault();
            let form = this.getForm();
        }
    }
    async fetchData(method: string, params: string) {
        let res = await fetch(`/api/notebooks/${params}`, {
            method
        });
        let json = await res.json();
        return json;
    }
    private async sendData(method: string, body: string): Promise<any> {
        let res = await fetch(`/api/tasks`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
        let json = await res.json();
        return json.ops[0];
    }
    private visible(): void {
        let contFormCreateTask = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task")
        let btnCreateTask = document.querySelector<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #btn-create-new-task");
        let btnCloseForm = contFormCreateTask.querySelector<HTMLButtonElement>("#form-create-new-task > form > #btn-close");
        btnCreateTask.onclick = (e) => {
            e.preventDefault();
            App.closeAll();
            RESPONSIVE.visibleFormTask();
        }
        btnCloseForm.onclick = (e) => {
            e.preventDefault();
            RESPONSIVE.visibleFormTask();
        }
    }
}

export default Form;