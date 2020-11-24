import App from "../app";
import NOTEBOOK from "../notebook";


// RESPONSIVE APP
class ResponsiveContent{
    static EnableConfigTask(){
        if(matchMedia("(max-width:500px)")){
            let btnTaskConfigArray = document.querySelectorAll<HTMLButtonElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task > .cont-task #cont-btn-visible-configuration");
            btnTaskConfigArray.forEach(btnTaskConfig=>{
                btnTaskConfig.onclick = (e)=>{
                    App.closeAll();
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
    static visibleFormTask(){
        let contForm = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task");
        if(getComputedStyle(contForm).right === "0px" || getComputedStyle(contForm).right === "40px"){
            contForm.style.right = "-110%";
        }else{
            if(matchMedia("(max-width:500px)").matches){
                contForm.style.right = "0px";
            }else{
                contForm.style.right = "40px";
            }
        }
    }
    static visibleULFilter(){
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


export default ResponsiveContent;