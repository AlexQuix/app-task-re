import PriorityTask from "./PriorityTask";
import { ITask } from "../services/task";

export enum TaskEvents {
    READ = "read",
    COMPLETED = "completed",
    CHANGE_PRIORITY = "change-priority"
}

class ReadTask {
    private btn: HTMLButtonElement;
    private event: Event;
    constructor(
        readonly taskElement: HTMLDivElement,
        readonly taskOptions: HTMLDivElement
    ) {
        this.event = new Event("read", {
            bubbles: true,
            cancelable: true
        })
        this.btn = taskOptions.querySelector('#task-options > #btn-read-task');
        this.btn.addEventListener("click", this.handleClick.bind(this));
    }

    private triggerEvent(){
        this.taskElement.dispatchEvent(this.event);
    }
    
    private async handleClick() {
        this.triggerEvent();
    }
}

class CompletedTask {
    private element: HTMLButtonElement;
    private event: Event;
    constructor(
        readonly taskElement: HTMLDivElement,
        readonly taskOptions: HTMLDivElement
    ) {
        this.event = new Event(TaskEvents.COMPLETED, {
            bubbles: true,
            cancelable: true
        });

        this.element = taskElement.querySelector('#task-info > #btn-complete-task');
        this.element.addEventListener("click", this.handleClick.bind(this));
    }

    private triggerEvent(){
        this.taskElement.dispatchEvent(this.event);
    }

    private async handleClick() {
        this.triggerEvent();
    }
}


// OPTIONS OF TASKS
export default class TaskOptions{
    public element: HTMLDivElement;
    private btnMobileOptions: HTMLButtonElement;
    private readTask: ReadTask;
    private completedTask: CompletedTask;
    private priorityTask: PriorityTask;

    constructor(
        private readonly taskElement: HTMLDivElement,
        protected readonly taskData: ITask
    ) {
        this.element = this.createElement();
        this.completedTask = new CompletedTask(taskElement, this.element);
        this.readTask = new ReadTask(taskElement, this.element);
        this.priorityTask = new PriorityTask(taskElement, taskData, this.element);
        this.btnMobileOptions = taskElement.querySelector('#cont-btn-visible-configuration');

        // Appends elements to TaskOptions element
        this.append(this.priorityTask.element);

        // add styles to task element
        this.taskElement.dataset.isEnabled = 'false';
        this.taskElement.style.marginBottom = "0px";

        // The event click is only executed in mobile version
        this.btnMobileOptions.onclick = this.handleBtnMobileOptionsClick.bind(this);
    }

    /**
     * Handles the click event of the mobile options button. 
     * Closes all other open elements, and either opens or closes the priority collection element,
     * depending on whether it is currently open or not.
     */
    private handleBtnMobileOptionsClick() {
        // App.closeEverything();
        
        // If taskElement has a bottom margin equal to 0, 
        // this means that the taskOptionElement element is not being displayed.
        if (getComputedStyle(this.taskElement).marginBottom === "0px") {
            this.taskElement.style.marginBottom = "40px";
            this.element.style.top = "34px";

            setTimeout(() => {
                if (this.element.style.top !== "34px") return;
                
                this.element.style.zIndex = "100";
            }, 500);
            return;
        }

        // Hides the taskOptionElement element
        this.element.style.zIndex = "-1";
        this.element.style.top = "0px";
        this.taskElement.style.marginBottom = "0px";
    }

    createElement(){
        let content = this.template(this.taskData);
        let taskOptionsElement = document.createElement("div");
        taskOptionsElement.id = "task-options";
        taskOptionsElement.innerHTML = content;
        return taskOptionsElement;
    }

    append(child:HTMLElement){
        this.element.appendChild(child);
    }

    template(data:ITask){
        return `
            <!-- DATE -->
            <div id="wrapper-date"><p>${data.created_date}</p></div>
            <div id="btn-read-task">
                <svg viewBox="0 0 118 91" xmlns="http://www.w3.org/2000/svg">
                    <path d="M110.635 0.0110309C99.5366 0.642747 77.4783 2.94211 63.861 11.3027C62.9213 11.8796 62.3887 12.9053 62.3887 13.9778V87.8886C62.3887 90.2346 64.9465 91.7175 67.1033 90.6287C81.1135 83.5559 101.375 81.6263 111.394 81.0981C114.815 80.9174 117.474 78.1671 117.474 74.8703V6.24694C117.476 2.64961 114.365 -0.200218 110.635 0.0110309ZM54.4378 11.3027C40.8225 2.94211 18.7643 0.644778 7.66626 0.0110309C3.93587 -0.200218 0.825195 2.64961 0.825195 6.24694V74.8724C0.825195 78.1711 3.48426 80.9214 6.90479 81.1002C16.9274 81.6283 37.1995 83.56 51.2097 90.6368C53.3604 91.7235 55.9101 90.2428 55.9101 87.9028V13.9413C55.9101 12.8667 55.3796 11.8816 54.4378 11.3027Z"/>
                </svg>                                    
            </div>

            <!-- BUTTON PRIORITY TASK -->
            <button id="btn-priority-toggle" data-priority="${data.priority}">
                <svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg">
                    <path d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/>
                </svg>                  
            </button>
        `
    }
}