import { BreakPoints, IResult, Visibility } from "../utils";
import TaskServices, { ITaskCreation, ITask } from "../services/task";

export type OnCompletedSubmit = (result:IResult<ITask>)=>Promise<void> | null;

// improve messages of the dialog

export default class TaskForm{
    private element: HTMLDivElement;
    private btnClose: HTMLButtonElement;
    private form: HTMLFormElement;

    /**
     * A method to be called when the form is closed.
     */
    public onClose: ()=>void;
    /**
     * A method to be called when the form is submitted.
     */
    public onSubmit: ()=>Promise<void> | null;
    /**
     * A method to be called after submitting the form.
     */
    public onCompletedSubmit: OnCompletedSubmit;


    constructor() {
        this.element = document.querySelector<HTMLDivElement>("#container-task > #form-new-task")
        this.form = this.element.querySelector<HTMLFormElement>("#container-task > #form-new-task form")
        this.btnClose = this.element.querySelector<HTMLButtonElement>("#btn-close");

        this.btnClose.addEventListener("click", this.handleClose.bind(this));
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    /**
     * Handles form submit event
     * @param {Event} e - The form event
     */
    async handleSubmit(e){
        e.preventDefault();
        if(this.onSubmit) await this.onSubmit();

        let taskFormData = new FormData(this.form);
        let task = Object.fromEntries(taskFormData);
        
        let result = await TaskServices.create(task as unknown as ITaskCreation);
        if(this.onCompletedSubmit) await this.onCompletedSubmit(result);
    }

    handleClose(){
        this.hide();
        if(this.onClose) this.onClose();
    }

    changeVisibility(visibility:Visibility){
        if(visibility === "hidden")
            return this.hide();

        this.show();
    }

    hide(){
        // if the viewport is less than mobile, add this style
        if(matchMedia(BreakPoints.MOBILE)){
            this.element.style.right = '-130%';
            this.element.style.transform = 'scale(1)';
            return;
        }

        this.element.style.right = '40px';
        this.element.style.transform = 'scale(0)';
    }

    show(){
        // if the viewport is less than mobile, add this style
        if(matchMedia(BreakPoints.MOBILE)){
            this.element.style.right = '0px';
            this.element.style.transform = 'scale(1)';
            return;
        }

        this.element.style.right = '40px';
        this.element.style.transform = 'scale(1)';
    }
}