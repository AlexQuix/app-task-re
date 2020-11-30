import NOTEBOOK from "./notebook";
import TASK from './task';
import FILTER from './filter';
import NAVEGATION from './navegation';
import Notebook from "./notebook";


type SendData = {
    notebook: DataNotebook[];
    task: DataTask[];
}
type DataNotebook = {
    _id: string;
    name: string;
    list_task?: DataTask[];
}
type DataTask = {
    _id: string;
    title: string;
    priority: string;
    description: string;
    _id_notebook: string;
}


class App {
    constructor() {
        this.start();
    }
    private async start() {
        await NOTEBOOK.consultData();
        new FILTER();
        new NAVEGATION();
        App.adaptViewport();
    }
    static showNotResult() {
        let btnCreateNotebook: HTMLDivElement = document.querySelector('#container-task > #btn-create-new-list-task');
        btnCreateNotebook.style.display = 'none';
        let div: HTMLDivElement = document.querySelector('#cont-not-result');
        div.style.display = 'flex';
        let span: HTMLSpanElement = document.querySelector('#cont-not-result > span');
        span.onclick = () => {
            Notebook.consultData();
            btnCreateNotebook.style.display = 'block';
            div.style.display = 'none'
        }
    }
    static removeNotResult() {
        let div: HTMLDivElement = document.querySelector('#cont-not-result');
        div.style.display = 'none'
    }
    static evaluationForInsert(json: SendData) {
        NOTEBOOK.removeAll();
        if (json.notebook && json.notebook[0]) {
            Notebook.insertNotebook(json);
        } else if (json.task && json.task[0]) {
            let datanotebook = {
                _id: "test",
                name: "Results"
            };
            NOTEBOOK.appendChild(datanotebook);
            TASK.insertTask(json.task, datanotebook, null);
        } else {
            App.showNotResult();
        }
    }
    static adaptViewport() {
        TASK.Responsive('hidden');
        NOTEBOOK.Responsive('hidden');
        FILTER.Responsive('hidden');
        if (matchMedia("(max-width: 500px)").matches) {
            NAVEGATION.Responsive();
        }
    }
    static isMatches(callTrue?, callfalse?) {
        if (matchMedia("(max-width: 500px)").matches && callTrue) {
            callTrue();
        } else if (callfalse) {
            callfalse();
        }
    }
    static closeEverything(): void {
        FILTER.Responsive('hidden');
        //NOTEBOOKS
        NOTEBOOK.Responsive('hidden');
        //TASKS
        TASK.Responsive('hidden');
        let ulPriorityArray = document.querySelectorAll<HTMLUListElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task > #cont-btns-config > #list-options-priority");
        for (let ulPriority of ulPriorityArray) {
            ulPriority.style.right = "-500px";
        }

        if (matchMedia("(max-width: 500px)").matches) {
            let contTaskArray = document.querySelectorAll<HTMLDivElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task");
            for (let contTask of contTaskArray) {
                if (contTask.dataset.isEnabled !== 'true') {
                    let contTaskConfig = (contTask.children[2] as HTMLDivElement);
                    if (getComputedStyle(contTask).marginBottom !== "0px") {
                        contTaskConfig.style.zIndex = "-1";
                        contTask.style.marginBottom = "0px";
                        contTaskConfig.style.top = "0px";
                    }
                }
            }
        }
    }
}

export type { SendData }
export default App;