import NotebookService, { INotebook } from "../services/notebook";
import {BreakPoints, Visibility} from "../utils";

const ContainerForm = document.querySelector<HTMLDivElement>("#container-task > #form-create-notebook");
const Form = document.querySelector<HTMLFormElement>("#form-create-notebook form");
const BtnClose = document.querySelector<HTMLButtonElement>("#form-create-notebook #btn-close");
const BtnNewNotebook = document.querySelector<HTMLButtonElement>("#form-create-notebook #btn-add-notebook");
const Input = document.querySelector<HTMLInputElement>("#name");

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
        // if the viewport is less than mobile, add this style
        if(matchMedia(BreakPoints.MOBILE)){
            Form.style.transform = "scale(1)";
            ContainerForm.style.display = 'none';
            ContainerForm.style.background = "transparent";
            return;
        }

        Form.style.transform = "scale(0)";
        ContainerForm.style.display = 'none';
        ContainerForm.style.background = "transparent";
    }

    show(){    
        // if the viewport is less than mobile, add this style
        if(matchMedia(BreakPoints.MOBILE)){
            ContainerForm.style.display = 'grid';
            Form.style.transform = "scale(1)";
            return;
        }

        Form.transform = "scale(1)";
        ContainerForm.style.display = 'grid';
        ContainerForm.style.background = "#000a";
    }
}