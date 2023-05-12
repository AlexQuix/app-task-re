import NotebookService, { INotebook } from "../services/notebook";
import {BreakPoints, Visibility} from "../utils";

const ContainerForm = document.querySelector<HTMLDivElement>("#new-notebook-form");
const Form = document.querySelector<HTMLFormElement>("#new-notebook-form form");
const BtnClose = document.querySelector<HTMLButtonElement>("#new-notebook-form #btn-close");
const BtnNewNotebook = document.querySelector<HTMLButtonElement>("#new-notebook-form #btn-add-notebook");


export default class NotebookCreationForm{
    /**
     * This method is call when the form has been closed
     */
    onClose: ()=>void;

    /**
     * This method is call after submitting the form and pass the notebook data
     */
    onCompletedSubmit: (notebookData:INotebook)=>void;

    constructor(){
        BtnClose.onclick = this.handleCloseClick.bind(this);
        BtnNewNotebook.onclick =  this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();
        let formdata = new FormData(Form);
        let data = Object.fromEntries(formdata.entries())

        let {result} = await NotebookService.create(data as any);
        if(!result) return;

        alert("You have been created a new notebook");
        this.changeVisibility("hidden");

        if(this.onCompletedSubmit) this.onCompletedSubmit(result);
    }

    handleCloseClick(e){
        e.preventDefault();
        this.changeVisibility("hidden");
        if(this.onClose) this.onClose();
    }

    changeVisibility(visibiblity:Visibility){
        if(visibiblity === "hidden")
            return this.hide();
        if(visibiblity === "visible")
            return this.show();
    }

    hide(){
        ContainerForm.classList.remove("visible");
    }

    show(){    
        ContainerForm.classList.add("visible");
    }
}