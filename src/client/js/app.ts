import NOTEBOOK from "./notebook";

class App {
    constructor() {
        this.start();
    }
    private async start() {
        await NOTEBOOK.consultData();
    }
    static closeEverything(): void {
        //NOTEBOOKS
        let contForm = document.querySelector<HTMLDivElement>("#container-task > #form-create-new-task");
        contForm.style.right = "-110%";

        let contFormCreate = document.querySelector<HTMLDivElement>("#container-task > #form-create-notebook");
        contFormCreate.style.left = "-100%";
        contFormCreate.style.background = "transparent";


        //TASKS
        let ulPriorityArray = document.querySelectorAll<HTMLUListElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task > #cont-btns-config > #list-options-priority");
        for (let ulPriority of ulPriorityArray) {
            ulPriority.style.right = "-500px";
        }

        if (matchMedia("(max-width: 500px)").matches) {
            let contTaskArray = document.querySelectorAll<HTMLDivElement>("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task");
            for (let contTask of contTaskArray) {
                let contTaskConfiguration = (contTask.children[2] as HTMLDivElement);

                if (getComputedStyle(contTask).marginBottom !== "0px") {
                    contTaskConfiguration.style.zIndex = "-1";
                    contTask.style.marginBottom = "0px";
                    contTaskConfiguration.style.top = "0px";
                }
            }
        }
    }
}

export default App;