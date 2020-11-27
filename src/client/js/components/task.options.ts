
import App from "../app";

interface ITaskData {
    _id: string;
    title: string;
    priority: string;
    description: string;
    _id_notebook: string;
}
interface IDataNotebook {
    _id: string;
    name: string;
}


class Read {
    private btn: HTMLButtonElement;
    constructor(
        contTask: HTMLDivElement,
        protected taskData: ITaskData,
    ) {
        this.btn = contTask.querySelector('#cont-btns-config > #btn-read-task');
        this.start();
    }
    private start() {
        this.btn.onclick = this.readTask.bind(this);
    }
    private readTask() {
        console.log(this.taskData);
    }
}

class Completed {
    private btn: HTMLButtonElement;
    constructor(
        contTask: HTMLDivElement,
        protected taskData: ITaskData,
        protected deleteData: (id: string) => Promise<void>
    ) {
        this.btn = contTask.querySelector('#cont-task-inf > #btn-complete-task');
        this.init();
    }
    private init() {
        this.btn.onclick = this.taskCompleted.bind(this);
    }
    private async taskCompleted() {
        this.deleteData(this.taskData._id);
    }
}

class Priority extends Completed {
    private contPriorityTag: HTMLDivElement;
    private btnPriority: HTMLButtonElement;
    private contPriorityOptions: HTMLUListElement;
    private contPriorityNotOptionSVG: string;
    private contPriorityOptionSVG: string;
    constructor(
        protected contTask: HTMLDivElement,
        protected taskData: ITaskData,
        protected update: (data: ITaskData) => Promise<void>,
        protected deleteData: (id: string) => Promise<void>
    ) {
        super(contTask, taskData, deleteData);
        this.contPriorityTag = contTask.querySelector<HTMLDivElement>("#cont-task-inf > #cont-tag-color");
        this.contPriorityOptions = contTask.querySelector<HTMLUListElement>("#cont-btns-config > #list-options-priority");
        this.btnPriority = contTask.querySelector<HTMLButtonElement>("#cont-btns-config > #btn-priority-task");
        // SVG OF PRIORITY OPTIONS
        this.contPriorityNotOptionSVG = `<svg viewBox="0 0 106 100" xmlns="http://www.w3.org/2000/svg"> <path d="M70.5287 24.0625C62.7793 24.0625 55.8119 18.4375 44.9906 18.4375C40.0535 18.4375 35.7946 19.5769 32.2586 21.1038C32.6091 19.9315 32.7244 18.6877 32.5965 17.4603C32.184 13.4409 29.203 10.2802 25.5806 10.0183C21.1707 9.69942 17.5048 13.5914 17.5048 18.4375C17.5048 21.5601 19.0279 24.2843 21.2902 25.7433V97.1875C21.2902 98.7409 22.42 100 23.8139 100H26.3375C27.7314 100 28.8612 98.7409 28.8612 97.1875V82.5198C34.8342 79.4828 40.1007 77.5 49.0229 77.5C56.7724 77.5 63.7397 83.125 74.5611 83.125C83.7848 83.125 90.6449 79.1494 94.8366 76.0971C96.9753 74.54 98.2614 71.884 98.2614 69.037V26.8639C98.2614 20.8067 92.6993 16.7094 87.7088 19.109C82.0459 21.8317 76.1229 24.0625 70.5287 24.0625ZM90.6905 69.0625C87.2547 71.7717 81.0968 74.6875 74.5611 74.6875C65.1061 74.6875 58.4725 69.0625 49.0229 69.0625C42.1836 69.0625 33.8212 70.7154 28.8612 73.2813V32.5C32.2971 29.7909 38.4548 26.875 44.9906 26.875C54.4456 26.875 61.0791 32.5 70.5287 32.5C77.3538 32.5 85.7211 29.4474 90.6905 26.875V69.0625Z" fill="black"/><path d="M102.259 9.4531L3.53784 90.547" stroke="black" stroke-width="11"/></svg>`;
        this.contPriorityOptionSVG = `<svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg"><path d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/></svg> `;
        this.start();
    }
    private start() {
        this.findPriorityCurrent();
        this.btnPriority.onclick = this.showPriorityOptions.bind(this);
    }
    // BUTTONS OF THE TASK
    private changePriorityFlag(li: HTMLLIElement) {
        if (li.dataset.priority === "none") {
            this.btnPriority.innerHTML = this.contPriorityNotOptionSVG;
            this.changeColorTag("#000");
        } else {
            this.btnPriority.innerHTML = this.contPriorityOptionSVG;
            let svg = this.btnPriority.querySelector("svg");
            svg.style.fill = li.dataset.background;
            this.changeColorTag(li.dataset.background);
        }
    }
    private changeColorTag(background: string): void {
        this.contPriorityTag.style.background = background;
    }
    private findPriorityCurrent() {
        const { priority } = this.btnPriority.dataset;

        let contSetUL = this.contPriorityOptions.querySelectorAll<HTMLLIElement>("#cont-btns-config > #list-options-priority li");
        for (let li of contSetUL) {
            if (priority === li.dataset.priority) {
                this.changePriorityFlag(li);
                break;
            }
        }
    }
    private async showPriorityOptions() {
        this.contTask.dataset.isEnabled = 'true';
        App.closeEverything();
        // ELEMENT UL VISIBLE
        this.contPriorityOptions.style.right = "0px";
        // ALL ELEMENTS LI OF THE ELEMENT UL
        let contAllLI = this.contPriorityOptions.querySelectorAll<HTMLLIElement>("#cont-btns-config > #list-options-priority li");
        for (let contLI of contAllLI) {
            contLI.onclick = async (e) => {
                this.contTask.dataset.isEnabled = 'false';
                App.closeEverything();
                let li = (e.currentTarget as HTMLLIElement);
                this.changePriorityFlag(li);
                // ELEMENT UL HIDDEN
                this.contPriorityOptions.style.right = "-500px";

                this.taskData.priority = li.dataset.priority;
                await this.update(this.taskData);
            }
        }
    }
}


// OPTIONS OF TASKS
class BtnOptions extends Priority {
    private contConfig: HTMLDivElement;
    private btnConfig: HTMLButtonElement;
    constructor(
        public contTask: HTMLDivElement,
        taskData: ITaskData,
        update: (data: ITaskData) => Promise<void>,
        deleteData: (id: string) => Promise<void>
    ) {
        super(contTask, taskData, update, deleteData);
        new Read(contTask, taskData);
        this.contConfig = contTask.querySelector('#cont-btns-config');
        this.btnConfig = contTask.querySelector('#cont-btn-visible-configuration');
        this.contTask.dataset.isEnabled = 'false';
        this.btnConfig.onclick = this.enableWorkButton.bind(this);
    }
    private enableWorkButton(e) {
        App.closeEverything();
        if (e) {
            if (getComputedStyle(this.contTask).marginBottom === "0px") {
                this.contTask.style.marginBottom = "50px";
                this.contConfig.style.top = "40px";
                setTimeout(() => {
                    if (this.contConfig.style.top === "40px") {
                        this.contConfig.style.zIndex = "initial";
                    }
                }, 500);
            } else {
                this.contConfig.style.zIndex = "-1";
                this.contTask.style.marginBottom = "0px";
                this.contConfig.style.top = "0px";
            }
        }
    }
}


export default BtnOptions;