import e from "express";
import App from "../app";



// RESPONSIVE APP
class Responsive{
    contFormTask: HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task");
    constructor(){
        Task = {
            form: {
                isEnable:false,
                element: document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task"),
                adaptContent: this.handleTaskFormContent
            },
            btn: {
               isEnable:false,
               element:document.querySelectorAll<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task > .cont-task #cont-btn-visible-configuration"),
               adaptContent: this.enableResponsive
            }
        }
        this.start();
    }
    start(){
        this.enableResponsive();
        this.handleTaskFormContent(this.contFormTask);
        this.handleFilterContent();
    }
    enableResponsive(){
        console.log(matchMedia("(max-width:500px)"))
        if(matchMedia("(max-width:500px)")){
            let btnTaskConfigArray = document.querySelectorAll<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task > .cont-task #cont-btn-visible-configuration");
            btnTaskConfigArray.forEach(btnTaskConfig=>{
                btnTaskConfig.onclick = (e)=>{
                    App.closeEverything();
                    let elementButton = (e.currentTarget as HTMLButtonElement);
                    let elementTask = elementButton.parentElement;
                    let elementTaskBtnConfig = (elementTask.children[2] as HTMLDivElement);

                    if(getComputedStyle(elementTask).marginBottom === "0px"){
                        elementTask.style.marginBottom = "50px";
                        elementTaskBtnConfig.style.top = "40px";
                        setTimeout(()=>{
                            if(elementTaskBtnConfig.style.top === "40px"){
                                elementTaskBtnConfig.style.zIndex = "initial";
                            }
                        }, 500);
                    }else{
                        elementTaskBtnConfig.style.zIndex = "-1";
                        elementTask.style.marginBottom = "0px";
                        elementTaskBtnConfig.style.top = "0px";
                    }
                };
            })
        }
    }
    handleTaskFormContent(form:HTMLDivElement){
        
        if(getComputedStyle(form).right === "0px" || getComputedStyle(form).right === "40px"){
            form.style.right = "-110%";
        }else{
            if(matchMedia("(max-width:500px)").matches){
                form.style.right = "0px";
            }else{
                form.style.right = "40px";
            }
        }
    }
    handleFilterContent(){
        let contInputsFilter = document.querySelector<HTMLUListElement>("#contaner-filter-search > ul");
        if(matchMedia("(max-width: 500px)").matches){
            let btnFilterVisible = document.querySelector<HTMLDivElement>("#contaner-filter-search > #cont-btn-filter");
            btnFilterVisible.onclick = ()=>{
                contInputsFilter.style.left = "0%";
            }
            let btnCLoseFilter = document.querySelector<HTMLDivElement>("#contaner-filter-search > ul > #cont-btn-close");
            btnCLoseFilter.onclick = ()=>{
                contInputsFilter.style.left = "-100%";
            }
        }
    }
};



export default new Responsive();