// INTERFACES
interface IContentTask {
    notebook: string;
    title: string;
    priority: string;
    description: string;
}

abstract class Form {
    static start() {
        Form.visible();
    }
    static getFormTask(): IContentTask {
        let formTaks = document.querySelector<HTMLFormElement>("#container-task > #form-create-new-task > form");

        let notebook = formTaks.querySelector<HTMLInputElement>("#notebook").value;
        let title = formTaks.querySelector<HTMLInputElement>("#title").value;
        let priority = formTaks.querySelector<HTMLSelectElement>("#priority").value;
        let description = formTaks.querySelector<HTMLTextAreaElement>("#description").value;

        return { notebook, title, priority, description };
    }
    static sendFormTask() {
        let btnAddTask = document.querySelector<HTMLButtonElement>("#container-task > #form-create-new-task > form > #btn-add-task");
        btnAddTask.onclick = (e) => {
            e.preventDefault();
            let form = Task.getFormTask();
        }
    }
    static visible(): void {
        let contFormCreateTask = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task")
        let btnCreateTask = document.querySelector<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #btn-create-new-task");
        let btnCloseForm = contFormCreateTask.querySelector<HTMLButtonElement>("#form-create-new-task > form > #btn-close");
        btnCreateTask.onclick = (e) => {
            e.preventDefault();
            NOTEBOOK.closeAll();
            RESPONSIVE.visibleFormTask();
        }
        btnCloseForm.onclick = (e) => {
            e.preventDefault();
            RESPONSIVE.visibleFormTask();
        }
    }
}

export default Form;