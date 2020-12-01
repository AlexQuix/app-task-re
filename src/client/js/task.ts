import { debug } from 'webpack';
import App from './app';
import FORM from './components/task.form';
import BtnOptions from './components/task.options';
import NOTEBOOK from './notebook';

interface IContentTask {
    _id: string;
    title: string;
    priority: string;
    description: string;
    _id_notebook: string;
}
interface IContentNotebook {
    _id: string;
    name: string;
    isTask?: boolean;
}

// ELEMENTS TASKS
class Task {
    static isTestNotebook: boolean = false;
    private contNotebook: HTMLDivElement;
    private contTask: HTMLDivElement;
    private contentStorageTasks: HTMLDivElement
    constructor(
        private datatask: IContentTask,
        private Notebook: NOTEBOOK
    ) {
        let uri = (Task.isTestNotebook) ? 'test' : datatask._id_notebook;
        this.contNotebook = document.getElementById('notebook-' + uri) as HTMLDivElement;
        this.contentStorageTasks = this.contNotebook.querySelector<HTMLDivElement>(`#cont-all-task`);
        this.appendChild();
        this.start();
    }
    public start() {
        new BtnOptions(this.contTask, this.datatask, this);
    }
    public async updateData(tasks: IContentTask) {
        this.datatask = tasks;
        let body = JSON.stringify(tasks);
        let result = await FORM.sendData('PUT', body);
    }
    public async deleteData(id: string) {
        let uri = '/api/tasks/'
        let result = await FORM.fetchData('DELETE', id, uri);
        if (result.n && result.ok) {
            this.contTask.remove();
            this.checkIsTask();
        }
    }
    public async readData(json:IContentTask){
        this.Notebook.readTask(json);
    }
    private appendChild() {
        let contTask = (document.createElement("task") as HTMLDivElement);

        contTask.className = "cont-task";
        contTask.id = 'task-' + this.datatask._id;
        contTask.innerHTML = Task.structureHTML(this.datatask);
        this.contentStorageTasks.appendChild(contTask);

        this.contTask = document.getElementById('task-' + this.datatask._id) as HTMLDivElement;
    }
    static Responsive(action: 'visible' | 'hidden') {
        FORM.Responsive(action);
    }
    static insertTask(list_task, datanotebook, Notebook: NOTEBOOK) {
        //this function is for iteration of list_task, it is call by function evaluationForInsert or insertNotebook
        if (datanotebook._id === 'test') {
            Task.isTestNotebook = true;
        } else {
            new FORM(datanotebook, Notebook);
        }

        if (list_task && list_task[0]) {
            for (let datatask of list_task) {
                new Task(datatask, Notebook);
            }
            if (Notebook) {
                Notebook.handleIsTask(true);
            }
        } else if (Notebook) {
            Notebook.handleIsTask(false);
        }
    }
    private checkIsTask() {
        if (!this.contentStorageTasks.innerText) {
            if (Task.isTestNotebook) {
                this.contNotebook.remove();
                App.showNotResult();
            } else {
                this.Notebook.handleIsTask(false);
            }
        }
    }
    static async consultData(datanotebook: IContentNotebook, Notebook: NOTEBOOK) {
        Task.isTestNotebook = false;
        let result = await FORM.fetchData('GET', datanotebook._id);
        if (result[0]) {
            for (let json of result) {
                new Task(json, Notebook);
            }
            Notebook.handleIsTask(true);
        } else {
            Notebook.handleIsTask(false);
        }
        new FORM(datanotebook, Notebook);
    }
    static async createTask(notebookData: IContentNotebook, Notebook: NOTEBOOK) {
        Task.isTestNotebook = false;
        let inputForm = FORM.getValuesForm(notebookData._id);
        let json = JSON.stringify(inputForm);
        let result = await FORM.sendData('POST', json);
        new Task(result, Notebook);

        // it check if there is task
        if (result._id) {
            Notebook.handleIsTask(true);
        }
    }
    private static structureHTML(task: IContentTask): string {
        return `
                    <!-- CONTAINER TASK INFORMATION -->
                    <div id="cont-task-inf">
                        <div id="cont-tag-color">
                        </div>
                        <button id="btn-complete-task">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </button>
                        <div id="cont-title">
                            <header><h1>${task.title}</h1></header>
                        </div>
                    </div>
                    <!-- CONTAINER BUTTON CONFIGURATION -->
                    <button id="cont-btn-visible-configuration" data-visible="true">
                        <svg viewBox="0 0 36 109" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.4884 54.5C35.4884 62.0252 27.5444 68.125 17.7442 68.125C7.94395 68.125 0 62.0252 0 54.5C0 46.9748 7.94395 40.875 17.7442 40.875C27.5444 40.875 35.4884 46.9748 35.4884 54.5Z"/>
                            <path d="M35.4884 13.625C35.4884 21.1502 27.5444 27.25 17.7442 27.25C7.94395 27.25 0 21.1502 0 13.625C0 6.09982 7.94395 0 17.7442 0C27.5444 0 35.4884 6.09982 35.4884 13.625Z"/>
                            <path d="M35.4884 95.375C35.4884 102.9 27.5444 109 17.7442 109C7.94395 109 0 102.9 0 95.375C0 87.8498 7.94395 81.75 17.7442 81.75C27.5444 81.75 35.4884 87.8498 35.4884 95.375Z"/>
                        </svg>
                    </button>
                    <div id="cont-btns-config">
                        <!-- CONTENT DATE THE CREATE -->
                        <div id="cont-date"><p>10/10/10</p></div>
                        <div id="btn-read-task">
                            <svg viewBox="0 0 118 91" xmlns="http://www.w3.org/2000/svg">
                                <path d="M110.635 0.0110309C99.5366 0.642747 77.4783 2.94211 63.861 11.3027C62.9213 11.8796 62.3887 12.9053 62.3887 13.9778V87.8886C62.3887 90.2346 64.9465 91.7175 67.1033 90.6287C81.1135 83.5559 101.375 81.6263 111.394 81.0981C114.815 80.9174 117.474 78.1671 117.474 74.8703V6.24694C117.476 2.64961 114.365 -0.200218 110.635 0.0110309ZM54.4378 11.3027C40.8225 2.94211 18.7643 0.644778 7.66626 0.0110309C3.93587 -0.200218 0.825195 2.64961 0.825195 6.24694V74.8724C0.825195 78.1711 3.48426 80.9214 6.90479 81.1002C16.9274 81.6283 37.1995 83.56 51.2097 90.6368C53.3604 91.7235 55.9101 90.2428 55.9101 87.9028V13.9413C55.9101 12.8667 55.3796 11.8816 54.4378 11.3027Z"/>
                            </svg>                                    
                        </div>
                        <!-- BUTTON PRIORITY TASK -->
                        <button id="btn-priority-task" data-priority="${task.priority}">
                            <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                                <path d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                            </svg>                  
                        </button>
                        <!--  LIST OF THE PRIORITYS  -->
                        <ul id="list-options-priority">
                            <li data-priority="urgent" data-background="#ED1A72">
                                <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#ED1A72" d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                                </svg> 
                                <span>Urgent</span>
                            </li>
                            <li data-priority="hight" data-background="#EDD81A">
                                <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#EDD81A" d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                                </svg> 
                                <span>Hight</span>
                            </li>
                            <li data-priority="normal" data-background="#6FDDFF">
                                <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#6FDDFF" d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                                </svg> 
                                <span>Normal</span>
                            </li>
                            <li data-priority="low" data-background="#939393">
                                <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#939393" d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                                </svg> 
                                <span>Low</span>
                            </li>
                            <li data-priority="none">
                                <svg viewBox="0 0 106 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M70.5287 24.0625C62.7793 24.0625 55.8119 18.4375 44.9906 18.4375C40.0535 18.4375 35.7946 19.5769 32.2586 21.1038C32.6091 19.9315 32.7244 18.6877 32.5965 17.4603C32.184 13.4409 29.203 10.2802 25.5806 10.0183C21.1707 9.69942 17.5048 13.5914 17.5048 18.4375C17.5048 21.5601 19.0279 24.2843 21.2902 25.7433V97.1875C21.2902 98.7409 22.42 100 23.8139 100H26.3375C27.7314 100 28.8612 98.7409 28.8612 97.1875V82.5198C34.8342 79.4828 40.1007 77.5 49.0229 77.5C56.7724 77.5 63.7397 83.125 74.5611 83.125C83.7848 83.125 90.6449 79.1494 94.8366 76.0971C96.9753 74.54 98.2614 71.884 98.2614 69.037V26.8639C98.2614 20.8067 92.6993 16.7094 87.7088 19.109C82.0459 21.8317 76.1229 24.0625 70.5287 24.0625ZM90.6905 69.0625C87.2547 71.7717 81.0968 74.6875 74.5611 74.6875C65.1061 74.6875 58.4725 69.0625 49.0229 69.0625C42.1836 69.0625 33.8212 70.7154 28.8612 73.2813V32.5C32.2971 29.7909 38.4548 26.875 44.9906 26.875C54.4456 26.875 61.0791 32.5 70.5287 32.5C77.3538 32.5 85.7211 29.4474 90.6905 26.875V69.0625Z" fill="black"/>
                                    <path d="M102.259 9.4531L3.53784 90.547" stroke="black" stroke-width="11"/>
                                </svg>
                                <span>Not import</span>
                            </li>
                        </ul>
                    </div>`;
    }

};


export default Task;