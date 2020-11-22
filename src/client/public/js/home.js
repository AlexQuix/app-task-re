"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navegation_1 = __importDefault(require("./navegation"));
function initApp() {
    navegation_1.default();
    handleContentNavegation();
    handleContentFilter();
    handleContentTask();
    matchMedia("(max-width: 500px)").onchange = initApp;
}
class ResponsiveContent {
    static EnableConfigTask() {
        if (matchMedia("(max-width:500px)")) {
            let btnTaskConfigArray = document.querySelectorAll("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task > .cont-task #cont-btn-visible-configuration");
            for (let btnTaskConfig of btnTaskConfigArray) {
                btnTaskConfig.onclick = (e) => {
                    Notebook.closeAll();
                    let elementButton = e.currentTarget;
                    let elementTask = elementButton.parentElement;
                    let elementTaskBtnConfig = elementTask.children[2];
                    if (getComputedStyle(elementTask).marginBottom === "0px") {
                        elementTask.style.marginBottom = "50px";
                        elementTaskBtnConfig.style.top = "40px";
                        setTimeout(() => {
                            if (elementTaskBtnConfig.style.top === "40px") {
                                elementTaskBtnConfig.style.zIndex = "initial";
                            }
                        }, 500);
                    }
                    else {
                        elementTaskBtnConfig.style.zIndex = "-1";
                        elementTask.style.marginBottom = "0px";
                        elementTaskBtnConfig.style.top = "0px";
                    }
                };
            }
        }
    }
    static visibleFormTask() {
        let contForm = document.querySelector("#container-task > #form-create-new-task");
        if (getComputedStyle(contForm).right === "0px" || getComputedStyle(contForm).right === "40px") {
            contForm.style.right = "-110%";
        }
        else {
            if (matchMedia("(max-width:500px)").matches) {
                contForm.style.right = "0px";
            }
            else {
                contForm.style.right = "40px";
            }
        }
    }
    static visibleULFilter() {
        let contInputsFilter = document.querySelector("#contaner-filter-search > ul");
        if (matchMedia("(max-width: 500px)").matches) {
            let btnFilterVisible = document.querySelector("#contaner-filter-search > #cont-btn-filter");
            btnFilterVisible.onclick = () => {
                contInputsFilter.style.left = "0%";
            };
            let btnCLoseFilter = document.querySelector("#contaner-filter-search > ul > #cont-btn-close");
            btnCLoseFilter.onclick = () => {
                contInputsFilter.style.left = "-100%";
            };
        }
    }
}
;
function handleContentNavegation() {
    let contInputSearch = document.querySelector("#container-nav > nav > ul > #link-search > a > input");
    if (matchMedia("(max-width: 500px)").matches) {
        let btnSearch = document.querySelector("#container-nav > nav > ul > #link-search > a > span");
        btnSearch.onclick = () => {
            contInputSearch.style.width = "200px";
            contInputSearch.style.padding = "5px 20px";
            contInputSearch.style.paddingRight = "70px";
        };
    }
}
function handleContentFilter() {
    ResponsiveContent.visibleULFilter();
}
class NotebookForm {
    constructor() {
        this.btnVisibleForm = document.querySelector("#container-task > #btn-create-new-list-task > button");
        this.containerForm = document.querySelector("#container-task > #form-create-notebook");
        this.contForm = this.containerForm.querySelector("form");
        this.btnCloseForm = this.contForm.querySelector("#btn-close");
        this.btnCreateNewNotebook = this.contForm.querySelector("#btn-add-notebook");
    }
    visibleForm() {
        this.btnVisibleForm.onclick = () => {
            Notebook.closeAll();
            if (getComputedStyle(this.containerForm).left !== "0px") {
                this.containerForm.style.left = "0px";
                this.containerForm.style.background = "#000a";
            }
        };
        this.btnCloseForm.onclick = (e) => {
            e.preventDefault();
            if (getComputedStyle(this.containerForm).left === "0px") {
                this.containerForm.style.left = "-100%";
                this.containerForm.style.background = "transparent";
            }
        };
    }
    getForm() {
        let name = this.contForm.querySelector("#name").value;
        return name;
    }
    sendForm() {
    }
}
class Notebook extends NotebookForm {
    constructor() {
        super();
        this.start();
    }
    start() {
        this.visibleForm();
    }
    addTaksWithinNotebook(task) {
        let listTaskHTML = document.querySelector("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task");
        let taskHTML = document.createElement("task");
        taskHTML.className = "cont-task";
        taskHTML.dataset.id = "1u98uhfqerf";
        taskHTML.innerHTML = ContentTask.taskHTML(task);
        listTaskHTML.appendChild(taskHTML);
        new ContentTask(taskHTML);
    }
    ;
    static notebookHTML() {
        return `
            <div id="name-list-task">
                <div id="name-list-task-flex">
                    <header><h1>My Task</h1></header>
                    <div id="btns-confg-list-task">
                        <button>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                        </button>
                        <button>
                            <svg viewBox="0 0 75 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.35714 76.5415C5.35714 78.6249 6.20376 80.6231 7.71075 82.0963C9.21774 83.5695 11.2617 84.3972 13.3929 84.3972H61.6071C63.7383 84.3972 65.7823 83.5695 67.2893 82.0963C68.7962 80.6231 69.6429 78.6249 69.6429 76.5415V21.5514H5.35714V76.5415ZM50.8929 34.6443C50.8929 33.9498 51.1751 33.2838 51.6774 32.7927C52.1797 32.3016 52.861 32.0257 53.5714 32.0257C54.2818 32.0257 54.9631 32.3016 55.4655 32.7927C55.9678 33.2838 56.25 33.9498 56.25 34.6443V71.3043C56.25 71.9988 55.9678 72.6648 55.4655 73.1559C54.9631 73.647 54.2818 73.9229 53.5714 73.9229C52.861 73.9229 52.1797 73.647 51.6774 73.1559C51.1751 72.6648 50.8929 71.9988 50.8929 71.3043V34.6443ZM34.8214 34.6443C34.8214 33.9498 35.1036 33.2838 35.606 32.7927C36.1083 32.3016 36.7896 32.0257 37.5 32.0257C38.2104 32.0257 38.8917 32.3016 39.394 32.7927C39.8964 33.2838 40.1786 33.9498 40.1786 34.6443V71.3043C40.1786 71.9988 39.8964 72.6648 39.394 73.1559C38.8917 73.647 38.2104 73.9229 37.5 73.9229C36.7896 73.9229 36.1083 73.647 35.606 73.1559C35.1036 72.6648 34.8214 71.9988 34.8214 71.3043V34.6443ZM18.75 34.6443C18.75 33.9498 19.0322 33.2838 19.5345 32.7927C20.0369 32.3016 20.7182 32.0257 21.4286 32.0257C22.139 32.0257 22.8203 32.3016 23.3226 32.7927C23.8249 33.2838 24.1071 33.9498 24.1071 34.6443V71.3043C24.1071 71.9988 23.8249 72.6648 23.3226 73.1559C22.8203 73.647 22.139 73.9229 21.4286 73.9229C20.7182 73.9229 20.0369 73.647 19.5345 73.1559C19.0322 72.6648 18.75 71.9988 18.75 71.3043V34.6443ZM72.3214 5.84002H52.2321L50.6585 2.77956C50.3251 2.12527 49.8116 1.57489 49.1758 1.19035C48.5399 0.805803 47.8069 0.602349 47.0592 0.602873H27.9241C27.1781 0.600069 26.4464 0.802765 25.8127 1.18774C25.1791 1.57271 24.6692 2.12439 24.3415 2.77956L22.7679 5.84002H2.67857C1.96817 5.84002 1.28686 6.1159 0.784535 6.60698C0.282206 7.09806 0 7.7641 0 8.45859L0 13.6957C0 14.3902 0.282206 15.0563 0.784535 15.5473C1.28686 16.0384 1.96817 16.3143 2.67857 16.3143H72.3214C73.0318 16.3143 73.7131 16.0384 74.2155 15.5473C74.7178 15.0563 75 14.3902 75 13.6957V8.45859C75 7.7641 74.7178 7.09806 74.2155 6.60698C73.7131 6.1159 73.0318 5.84002 72.3214 5.84002Z" fill="white"/>
                                </svg>
                        </button>
                    </div>
                </div>
            </div>
            <section id="cont-all-task"></section>
            <button id="btn-create-new-task">
                <svg viewBox="0 0 71 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M44.7203 22.1121V0.794922H27.1529H0.454102V75.5906H41.43C31.4205 74.5774 23.6085 66.1253 23.6085 55.8486C23.6085 44.8892 32.4929 36.0049 43.4523 36.0049H50.4495C61.4089 36.0049 70.2933 44.8892 70.2933 55.8486C70.2933 66.1253 62.4813 74.5774 52.4718 75.5906H70.3907V25.1121H47.7203H44.7203V22.1121ZM50.7203 19.1121V0.794922H54.0879L70.3907 14.2276V19.1121H50.7203ZM61.5419 52.9948H50.5988V44.6973C50.5988 43.6792 49.5098 42.8535 48.167 42.8535H45.7352C44.3924 42.8535 43.3034 43.6792 43.3034 44.6973V52.9948H32.3603C31.0175 52.9948 29.9285 53.8206 29.9285 54.8387V56.6826C29.9285 57.7008 31.0175 58.5265 32.3603 58.5265H43.3034V66.824C43.3034 67.8422 44.3924 68.6679 45.7352 68.6679H48.167C49.5098 68.6679 50.5988 67.8422 50.5988 66.824V58.5265H61.5419C62.8847 58.5265 63.9737 57.7008 63.9737 56.6826V54.8387C63.9737 53.8206 62.8847 52.9948 61.5419 52.9948Z"/>
                </svg>                        
                <p>Create new task</p>
            </button>
        `;
    }
    static closeAll() {
        let ulPriorityArray = document.querySelectorAll("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task > #cont-btns-config > #list-options-priority");
        for (let ulPriority of ulPriorityArray) {
            ulPriority.style.right = "-500px";
        }
        let contForm = document.querySelector("#container-task > #form-create-new-task");
        contForm.style.right = "-110%";
        let contFormCreate = document.querySelector("#container-task > #form-create-notebook");
        contFormCreate.style.left = "-100%";
        contFormCreate.style.background = "transparent";
        if (matchMedia("(max-width: 500px)").matches) {
            let contTaskArray = document.querySelectorAll("#container-task > #cont-all-task-lists .cont-list-task > #cont-all-task .cont-task");
            for (let contTask of contTaskArray) {
                let contTaskConfiguration = contTask.children[2];
                if (getComputedStyle(contTask).marginBottom !== "0px") {
                    contTaskConfiguration.style.zIndex = "-1";
                    contTask.style.marginBottom = "0px";
                    contTaskConfiguration.style.top = "0px";
                }
            }
        }
    }
}
class TaskOptionPriority {
    constructor() {
        this.priorityOptionNotImportSVG = `<svg viewBox="0 0 106 100" xmlns="http://www.w3.org/2000/svg"> <path d="M70.5287 24.0625C62.7793 24.0625 55.8119 18.4375 44.9906 18.4375C40.0535 18.4375 35.7946 19.5769 32.2586 21.1038C32.6091 19.9315 32.7244 18.6877 32.5965 17.4603C32.184 13.4409 29.203 10.2802 25.5806 10.0183C21.1707 9.69942 17.5048 13.5914 17.5048 18.4375C17.5048 21.5601 19.0279 24.2843 21.2902 25.7433V97.1875C21.2902 98.7409 22.42 100 23.8139 100H26.3375C27.7314 100 28.8612 98.7409 28.8612 97.1875V82.5198C34.8342 79.4828 40.1007 77.5 49.0229 77.5C56.7724 77.5 63.7397 83.125 74.5611 83.125C83.7848 83.125 90.6449 79.1494 94.8366 76.0971C96.9753 74.54 98.2614 71.884 98.2614 69.037V26.8639C98.2614 20.8067 92.6993 16.7094 87.7088 19.109C82.0459 21.8317 76.1229 24.0625 70.5287 24.0625ZM90.6905 69.0625C87.2547 71.7717 81.0968 74.6875 74.5611 74.6875C65.1061 74.6875 58.4725 69.0625 49.0229 69.0625C42.1836 69.0625 33.8212 70.7154 28.8612 73.2813V32.5C32.2971 29.7909 38.4548 26.875 44.9906 26.875C54.4456 26.875 61.0791 32.5 70.5287 32.5C77.3538 32.5 85.7211 29.4474 90.6905 26.875V69.0625Z" fill="black"/><path d="M102.259 9.4531L3.53784 90.547" stroke="black" stroke-width="11"/></svg>`;
        this.priorityOptionsSVG = `<svg viewBox="0 0 81 90" xmlns="http://www.w3.org/2000/svg"><path d="M54.7675 17.3641C46.1812 17.3641 39.0898 11.2499 28.2946 11.2499C24.296 11.2499 20.7142 12.0206 17.3916 13.3616C17.8521 12.0423 18.0481 10.6297 17.9662 9.21985C17.6823 4.22133 13.9471 0.21193 9.38566 0.00837558C4.25938 -0.220492 0.0380859 4.27072 0.0380859 9.84369C0.0380859 13.1881 1.5598 16.1411 3.88364 17.92V85.7812C3.88364 88.1112 5.60533 90 7.72919 90H10.2929C12.4168 90 14.1384 88.1112 14.1384 85.7812V69.1875C18.6748 67.0669 24.3263 65.2988 32.4745 65.2988C41.061 65.2988 48.1522 71.413 58.9475 71.413C66.6657 71.413 72.8343 68.5489 78.5766 64.231C79.9679 63.1849 80.7947 61.448 80.7947 59.5977V16.8653C80.7947 12.7532 76.9061 10.0327 73.5066 11.7648C68.0046 14.5682 61.2563 17.3641 54.7675 17.3641Z"/></svg> `;
    }
    addFlagColor(li) {
        if (li.dataset.priority === "none") {
            this.btnPriorityTaskHTML.innerHTML = this.priorityOptionNotImportSVG;
            this.tagColor("#000");
        }
        else {
            this.btnPriorityTaskHTML.innerHTML = this.priorityOptionsSVG;
            let svg = this.btnPriorityTaskHTML.querySelector("svg");
            svg.style.fill = li.dataset.background;
            this.tagColor(li.dataset.background);
        }
    }
    tagColor(background) {
        this.tagColorHTML.style.background = background;
    }
    findPriorityValue() {
        const { priority } = this.btnPriorityTaskHTML.dataset;
        let contLIAll = this.ULPriorityHTML.querySelectorAll("#cont-btns-config > #list-options-priority li");
        for (let li of contLIAll) {
            if (priority === li.dataset.priority) {
                this.addFlagColor(li);
                break;
            }
        }
    }
    priorityOptionsEnable() {
        this.btnPriorityTaskHTML.onclick = (e) => {
            Notebook.closeAll();
            this.ULPriorityHTML.style.right = "0px";
            let contAllLI = this.ULPriorityHTML.querySelectorAll("#cont-btns-config > #list-options-priority li");
            for (let contLI of contAllLI) {
                contLI.onclick = (e) => {
                    let li = e.currentTarget;
                    this.addFlagColor(li);
                    this.ULPriorityHTML.style.right = "-500px";
                };
            }
        };
    }
}
class ContentTask extends TaskOptionPriority {
    constructor(taskHTML) {
        super();
        this.taskHTML = taskHTML;
        this.tagColorHTML = this.taskHTML.querySelector("#cont-task-inf > #cont-tag-color");
        this.ULPriorityHTML = this.taskHTML.querySelector("#cont-btns-config > #list-options-priority");
        this.btnPriorityTaskHTML = this.taskHTML.querySelector("#cont-btns-config > #btn-priority-task");
        this.start();
    }
    start() {
        this.priorityOptionsEnable();
        this.findPriorityValue();
    }
    static taskHTML(task) {
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
    static getFormTask() {
        let formTaks = document.querySelector("#container-task > #form-create-new-task > form");
        let notebook = formTaks.querySelector("#notebook").value;
        let title = formTaks.querySelector("#title").value;
        let priority = formTaks.querySelector("#priority").value;
        let description = formTaks.querySelector("#description").value;
        return { notebook, title, priority, description };
    }
    static sendFormTask() {
        let btnAddTask = document.querySelector("#container-task > #form-create-new-task > form > #btn-add-task");
        btnAddTask.onclick = (e) => {
            e.preventDefault();
            let form = ContentTask.getFormTask();
        };
    }
    static formTaskVisible() {
        let contFormCreateTask = document.querySelector("#container-task > #form-create-new-task");
        let btnCreateTask = document.querySelector("#container-task > #cont-all-task-lists .cont-list-task > #btn-create-new-task");
        let btnCloseForm = contFormCreateTask.querySelector("#form-create-new-task > form > #btn-close");
        btnCreateTask.onclick = (e) => {
            e.preventDefault();
            Notebook.closeAll();
            ResponsiveContent.visibleFormTask();
        };
        btnCloseForm.onclick = (e) => {
            e.preventDefault();
            ResponsiveContent.visibleFormTask();
        };
    }
}
;
function handleContentTask() {
    ContentTask.formTaskVisible();
    const NOTEBOOK = new Notebook();
    ResponsiveContent.EnableConfigTask();
    let btnAddTask = document.querySelector("#container-task > #form-create-new-task > form > #btn-add-task");
    btnAddTask.onclick = (e) => {
        e.preventDefault();
        let form = ContentTask.getFormTask();
        NOTEBOOK.addTaksWithinNotebook(form);
        Notebook.closeAll();
    };
}
;
window.onload = initApp;
