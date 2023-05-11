import { PriorityEvent } from './PriorityTask';
import { PriorityLevel, PriorityLevelColor } from './Priority';
import TaskOptions, { TaskEvents } from './TaskOptions';
import Dialog from './Dialog';
import TaskService, { ITask } from '../services/task';

class Task{
    data: ITask;
    element: HTMLDivElement;
    taskOptions: TaskOptions;
    private priorityColorElement: HTMLDivElement

    /**
     * This event would execute when the user reads the task
     */
    public onCompleted: ()=>void | null;
    /**
     * This event would execute when the user reads the task
     */
    public onRead: ()=>void | null;
    /**
     * This event would execute when the user changes the priority of the task
     */
    public onPriorityChanged: (priority)=>void | null;

    constructor(data:ITask){
        this.data = data;
        this.element = this.createElement(this.data);
        this.taskOptions = new TaskOptions(this.element, this.data);
        this.priorityColorElement = this.element.querySelector<HTMLDivElement>("#task-info > #priority-color");

        // Appens elements to the task element
        this.element.append(this.taskOptions.element);

        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handlePriorityChanged = this.handlePriorityChanged.bind(this);

        this.element.addEventListener(TaskEvents.COMPLETED, this.handleCompleted);
        this.element.addEventListener(TaskEvents.READ, this.handleRead);
        this.element.addEventListener(TaskEvents.CHANGE_PRIORITY, this.handlePriorityChanged);

        this.updatePriorityColor(this.data.priority);
    }

    /**
     * Removes the custom event of tasks
     */
    removeEvents(){
        this.element.removeEventListener(TaskEvents.COMPLETED, this.handleCompleted);
        this.element.removeEventListener(TaskEvents.READ, this.handleRead)
        this.element.removeEventListener(TaskEvents.CHANGE_PRIORITY, this.handlePriorityChanged)
    }

    updatePriorityColor(priority:PriorityLevel){
        let color:PriorityLevelColor;
        if(priority === "none")
            color = PriorityLevelColor.NOT_IMPORTANT;
        else
            color = PriorityLevelColor[priority.toUpperCase()]

        this.priorityColorElement.style.background = color;
    }

    /**
     * Handles the complete event of task
     */
    private async handleCompleted(){
        let {result} = await TaskService.delete(this.data._id);
        if(!result) return alert("Something went wrong!");

        if(this.onCompleted) this.onCompleted();
        alert("Task complete! 🎉🎊");
    }

    private handleRead(){
        Dialog.show("read", this.data);
    }

    private async handlePriorityChanged({prioritySelected}:PriorityEvent){
        if(this.onPriorityChanged) this.onPriorityChanged(prioritySelected);

        this.data.priority = prioritySelected.priorityLevel
        let {result} = await TaskService.update(this.data._id, this.data)
        if(!result) return;

        this.updatePriorityColor(prioritySelected.priorityLevel);
    }

    private createElement(taskData:ITask){
        let task = document.createElement("div");
        task.className = "task";
        // task.id = 'task-' + this.ta._id;
        task.innerHTML = this.template(taskData);
        return task;
    }

    private template(task: ITask): string {
        return `
            <!-- CONTAINER TASK INFORMATION -->
            <div id="task-info">
                <div id="priority-color"></div>
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
        `;
    }
}

export default Task;