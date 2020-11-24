//NOTEBOOK
abstract class FormNotebook {
    static btnVisibleForm: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#container-task > #btn-create-new-list-task > button");
    static containerForm: HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-notebook");
    static contForm: HTMLFormElement = Form.containerForm.querySelector<HTMLFormElement>("form");
    static btnCloseForm: HTMLButtonElement = Form.contForm.querySelector<HTMLButtonElement>("#btn-close");
    static btnCreateNewNotebook: HTMLButtonElement = Form.contForm.querySelector("#btn-add-notebook");
    static startForm() {
        Form.visibleForm();
        Form.closeForm();
    }
    static visibleForm() {
        Form.btnVisibleForm.onclick = () => {
            Notebook.closeAll();
            if (getComputedStyle(Form.containerForm).left !== "0px") {
                Form.containerForm.style.left = "0px";
                Form.containerForm.style.background = "#000a";
            }
        }
    }
    static closeForm() {
        Form.btnCloseForm.onclick = (e) => {
            e.preventDefault();
            if (getComputedStyle(Form.containerForm).left === "0px") {
                Form.containerForm.style.left = "-100%";
                Form.containerForm.style.background = "transparent";
            }
        }
    }
    static async getForm() {
        let name = Form.contForm.querySelector<HTMLInputElement>("#name").value;
        let json = JSON.stringify({
            name
        })
        return await Notebook.sendData('POST', json);
    }
    static sendForm() {

    }
    static async fetchData(method:string, params?:string){
        let res = await fetch(`/api/notebooks/${params}`, {
            method
        });
        let json = res.json();
        console.log(json)
    }
    static async sendData(method: string, body: string):Promise<any>{
        let res = await fetch(`/api/notebooks`, {
            method,
            headers:{
                "Content-Type":"application/json"
            },
            body
        });
        let json = await res.json();
        return json.ops[0];
    }
}


abstract class FormTask{
    static startForm(){
        Form.formTaskVisible();
    }
    static getFormTask():IContentTask{
        let formTaks = document.querySelector<HTMLFormElement>("#container-task > #form-create-new-task > form");

        let notebook = formTaks.querySelector<HTMLInputElement>("#notebook").value;
        let title = formTaks.querySelector<HTMLInputElement>("#title").value;
        let priority = formTaks.querySelector<HTMLSelectElement>("#priority").value;
        let description = formTaks.querySelector<HTMLTextAreaElement>("#description").value;

        return {notebook, title, priority, description};
    }
    static sendFormTask(){
        let btnAddTask = document.querySelector<HTMLButtonElement>("#container-task > #form-create-new-task > form > #btn-add-task");
        btnAddTask.onclick = (e)=>{
            e.preventDefault();
            let form = Task.getFormTask();
        }
    }
    static formTaskVisible():void{
        let contFormCreateTask = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task")
        let btnCreateTask = document.querySelector<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #btn-create-new-task");
        let btnCloseForm = contFormCreateTask.querySelector<HTMLButtonElement>("#form-create-new-task > form > #btn-close");
        btnCreateTask.onclick = (e)=>{
            e.preventDefault();
            NOTEBOOK.closeAll();
            RESPONSIVE.visibleFormTask();
        }
        btnCloseForm.onclick = (e)=>{
            e.preventDefault();
            RESPONSIVE.visibleFormTask();
        }
    }
}