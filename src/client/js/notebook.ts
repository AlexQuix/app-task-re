import { debug } from 'webpack';
import TASK from './task';
import FORM from './components/notebook.form';

interface IContentNotebook {
    _id: string;
    name: string;
}


class Notebook {
    private isConsultTask: boolean;
    private json: IContentNotebook;
    private contNotebook: HTMLDivElement;
    private btnEdit: HTMLButtonElement;
    private btnDelete: HTMLButtonElement;
    private contNotebookName: HTMLButtonElement;
    private static contentStorageNotebooks: HTMLDivElement = document.querySelector<HTMLDivElement>('#container-task > #cont-all-task-lists');
    constructor(json: IContentNotebook, isConsultTask: boolean = true) {
        this.json = json;
        this.isConsultTask = isConsultTask;
        this.contNotebook = document.getElementById('notebook-' + this.json._id) as HTMLDivElement;
        this.btnEdit = this.contNotebook.querySelector('#name-list-task > #name-list-task-flex > #btns-confg-list-task button:nth-child(1)');
        this.btnDelete = this.contNotebook.querySelector('#name-list-task > #name-list-task-flex > #btns-confg-list-task button:nth-child(2)')
        this.contNotebookName = this.contNotebook.querySelector('#name-list-task > #name-list-task-flex > header > h1');
        this.start();
    }
    private async start() {
        if (this.isConsultTask) {
            await TASK.consultData(this.json, this);
        }
        this.btnEdit.onclick = this.updateData.bind(this);
        this.btnDelete.onclick = this.deleteData.bind(this);
    }
    public handleIsTask(isTask: boolean) {
        if (isTask) {
            let contSVGEmpty = this.contNotebook.querySelector('#cont-img-empty');
            if (contSVGEmpty) {
                contSVGEmpty.remove();
            }
        } else {
            let contStorageAllTask = this.contNotebook.querySelector('#cont-all-task');
            let contImgEmpty = Notebook.SVGEmptyHTML();
            contStorageAllTask.innerHTML = contImgEmpty;
        }
    }
    private async updateData(e) {
        let value = prompt('Change the name notebook');
        if (value) {
            this.json.name = value;
            let body = JSON.stringify(this.json);
            let result = await FORM.sendData('PUT', body);
            if (result.n && result.nModified && result.ok) {
                this.contNotebookName.innerHTML = value;
                alert('Has cambiado el nombre de tu Notebook');
            }
        }
    }
    private async deleteData(e) {
        let value = prompt(`Estas seguro que quieres eliminar este Notebook \n Escribe "${this.json.name}" para confirmar`);
        if (this.json.name === 'My task') {
            alert('Este notebook no se eliminar');
        } else {
            if (value === this.json.name) {
                let result = await FORM.fetchData("DELETE", this.json._id);
                if (result.n && result.ok) {
                    this.contNotebook.remove();
                    alert('Has eliminado el Notebook ' + this.json.name);
                }
            }
        }

    }
    static removeAll() {
        Notebook.contentStorageNotebooks.innerHTML = '';
    }
    static Responsive(action: 'visible' | 'hidden') {
        FORM.Responsive(action);
    }
    static insertNotebook(json) {
        for (let datanotebook of json.notebook) {
            Notebook.appendChild(datanotebook);
            let instance = new Notebook(datanotebook, false);
            TASK.insertTask(datanotebook.list_task, datanotebook, instance);
            new FORM();
        }
    }
    static async createNotebook() {
        let json = await FORM.getForm();
        await Notebook.appendChild(json);
        await new Notebook(json);
    }
    static async consultData() {
        let json = await FORM.fetchData('GET');
        for (let notebook of json) {
            Notebook.appendChild(notebook);
            new Notebook(notebook);
        }
        new FORM();
    }
    static async appendChild(json: IContentNotebook) {
        let innerNotebook = Notebook.innerHTML(json);

        let contNotebook = document.createElement("list-task");
        contNotebook.className = 'cont-list-task';
        contNotebook.id = 'notebook-' + (json._id);
        contNotebook.innerHTML = innerNotebook;

        Notebook.contentStorageNotebooks.appendChild(contNotebook);
    }
    private static innerHTML(json): string {
        return `
            <div id="name-list-task">
                <div id="name-list-task-flex">
                    <header><h1>${json.name}</h1></header>
                    ${(json._id !== "test")
                ? `<div id="btns-confg-list-task">
                                        <button>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                                        </button>
                                        <button>
                                            <svg viewBox="0 0 75 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.35714 76.5415C5.35714 78.6249 6.20376 80.6231 7.71075 82.0963C9.21774 83.5695 11.2617 84.3972 13.3929 84.3972H61.6071C63.7383 84.3972 65.7823 83.5695 67.2893 82.0963C68.7962 80.6231 69.6429 78.6249 69.6429 76.5415V21.5514H5.35714V76.5415ZM50.8929 34.6443C50.8929 33.9498 51.1751 33.2838 51.6774 32.7927C52.1797 32.3016 52.861 32.0257 53.5714 32.0257C54.2818 32.0257 54.9631 32.3016 55.4655 32.7927C55.9678 33.2838 56.25 33.9498 56.25 34.6443V71.3043C56.25 71.9988 55.9678 72.6648 55.4655 73.1559C54.9631 73.647 54.2818 73.9229 53.5714 73.9229C52.861 73.9229 52.1797 73.647 51.6774 73.1559C51.1751 72.6648 50.8929 71.9988 50.8929 71.3043V34.6443ZM34.8214 34.6443C34.8214 33.9498 35.1036 33.2838 35.606 32.7927C36.1083 32.3016 36.7896 32.0257 37.5 32.0257C38.2104 32.0257 38.8917 32.3016 39.394 32.7927C39.8964 33.2838 40.1786 33.9498 40.1786 34.6443V71.3043C40.1786 71.9988 39.8964 72.6648 39.394 73.1559C38.8917 73.647 38.2104 73.9229 37.5 73.9229C36.7896 73.9229 36.1083 73.647 35.606 73.1559C35.1036 72.6648 34.8214 71.9988 34.8214 71.3043V34.6443ZM18.75 34.6443C18.75 33.9498 19.0322 33.2838 19.5345 32.7927C20.0369 32.3016 20.7182 32.0257 21.4286 32.0257C22.139 32.0257 22.8203 32.3016 23.3226 32.7927C23.8249 33.2838 24.1071 33.9498 24.1071 34.6443V71.3043C24.1071 71.9988 23.8249 72.6648 23.3226 73.1559C22.8203 73.647 22.139 73.9229 21.4286 73.9229C20.7182 73.9229 20.0369 73.647 19.5345 73.1559C19.0322 72.6648 18.75 71.9988 18.75 71.3043V34.6443ZM72.3214 5.84002H52.2321L50.6585 2.77956C50.3251 2.12527 49.8116 1.57489 49.1758 1.19035C48.5399 0.805803 47.8069 0.602349 47.0592 0.602873H27.9241C27.1781 0.600069 26.4464 0.802765 25.8127 1.18774C25.1791 1.57271 24.6692 2.12439 24.3415 2.77956L22.7679 5.84002H2.67857C1.96817 5.84002 1.28686 6.1159 0.784535 6.60698C0.282206 7.09806 0 7.7641 0 8.45859L0 13.6957C0 14.3902 0.282206 15.0563 0.784535 15.5473C1.28686 16.0384 1.96817 16.3143 2.67857 16.3143H72.3214C73.0318 16.3143 73.7131 16.0384 74.2155 15.5473C74.7178 15.0563 75 14.3902 75 13.6957V8.45859C75 7.7641 74.7178 7.09806 74.2155 6.60698C73.7131 6.1159 73.0318 5.84002 72.3214 5.84002Z" fill="white"/>
                                                </svg>
                                        </button>
                                    </div>`
                : ""
            }
                </div>
            </div>
            <section id="cont-all-task"></section>
            ${(json._id !== "test")
                ? `<button id="btn-create-new-task">
                        <svg viewBox="0 0 71 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" d="M44.7203 22.1121V0.794922H27.1529H0.454102V75.5906H41.43C31.4205 74.5774 23.6085 66.1253 23.6085 55.8486C23.6085 44.8892 32.4929 36.0049 43.4523 36.0049H50.4495C61.4089 36.0049 70.2933 44.8892 70.2933 55.8486C70.2933 66.1253 62.4813 74.5774 52.4718 75.5906H70.3907V25.1121H47.7203H44.7203V22.1121ZM50.7203 19.1121V0.794922H54.0879L70.3907 14.2276V19.1121H50.7203ZM61.5419 52.9948H50.5988V44.6973C50.5988 43.6792 49.5098 42.8535 48.167 42.8535H45.7352C44.3924 42.8535 43.3034 43.6792 43.3034 44.6973V52.9948H32.3603C31.0175 52.9948 29.9285 53.8206 29.9285 54.8387V56.6826C29.9285 57.7008 31.0175 58.5265 32.3603 58.5265H43.3034V66.824C43.3034 67.8422 44.3924 68.6679 45.7352 68.6679H48.167C49.5098 68.6679 50.5988 67.8422 50.5988 66.824V58.5265H61.5419C62.8847 58.5265 63.9737 57.7008 63.9737 56.6826V54.8387C63.9737 53.8206 62.8847 52.9948 61.5419 52.9948Z"/>
                        </svg>                        
                        <p>Create new task</p>
                    </button>`
                : ""
            }
        `
    }
    private static SVGEmptyHTML() {
        return `
            <div id='cont-img-empty'>
                <svg width="560" height="428" viewBox="0 0 560 428" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="560" height="428"/>
                <path opacity="0.24" d="M559.16 258.895C558.96 284.835 555.55 311.275 544.91 334.435C538.147 349.082 528.596 362.271 516.79 373.265C489.08 399.475 450.62 413.665 413.43 418.115C360.85 424.405 307.66 415.475 254.78 418.245C221.78 419.985 189.01 426.245 155.97 427.115C122.93 427.985 88.6 422.905 60.55 403.855C49.8935 396.53 40.4464 387.585 32.55 377.345C22.306 364.132 14.312 349.32 8.88997 333.505C-12.19 272.685 5.21997 198.415 50.51 156.135C68.38 139.435 89.67 127.725 110.82 116.405C155.07 92.8148 229.37 -71.5952 403.46 36.4048C437.46 57.5548 455.07 100.865 485.13 128.275C511.9 152.675 542.26 176.545 553.58 212.555C558.26 227.365 559.27 243.265 559.16 258.895Z" fill="#7B68EE"/>
                <path opacity="0.24" d="M514 374.326C486.59 400.406 448.546 414.525 411.758 418.953C359.747 425.211 307.133 416.326 254.825 419.082C222.182 420.814 189.767 427.042 157.084 427.908C124.402 428.774 90.4435 423.719 62.697 404.764C52.1558 397.475 42.8109 388.575 35 378.386C37.6637 377.703 40.3657 377.181 43.0915 376.824C97.9513 369.361 153.474 368.466 208.828 367.6L359.945 365.202C376.692 364.933 393.518 364.665 410.205 366.297C431.552 368.366 452.513 373.491 473.869 375.421C487.411 376.665 500.656 374.675 514 374.326Z" fill="#7B68EE"/>
                <path d="M142.212 377.273C152.524 368.684 179.143 366.359 198.065 365C352.166 366.388 412.207 371.331 429.871 374.104C443.44 376.233 445.101 378.547 444.996 380.896C444.722 386.993 439.01 390.612 433.957 390.612C347.812 391.449 261.674 390.933 175.543 389.063C163.789 388.8 131.285 386.372 142.212 377.273Z" fill="#9286CF"/>
                <path d="M375.599 46H175.401C165.791 46 158 53.158 158 61.9877V360.012C158 368.843 165.791 376 175.401 376H375.599C385.21 376 393 368.843 393 360.012V61.9877C393 53.158 385.21 46 375.599 46Z" fill="url(#paint0_linear)"/>
                <path d="M376.83 46H192.98C184.155 46 177 53.1545 177 61.98V359.86C177 368.686 184.155 375.84 192.98 375.84H376.83C385.656 375.84 392.81 368.686 392.81 359.86V61.98C392.81 53.1545 385.656 46 376.83 46Z" fill="url(#paint1_linear)"/>
                <path d="M200 237.72L205.65 64L369 67.45C369 67.45 347.64 247.77 362.72 294.31C377.8 340.85 380.31 358.31 380.31 358.31L203.77 363.31L200 237.72Z" fill="url(#paint2_linear)"/>
                <path d="M404.17 341.97L225.59 343.86C225.59 343.86 207.23 237.19 204.04 201.43C200.91 166.98 200.19 63.02 200.19 63.02H370.72C370.72 63.02 371.15 163.77 374.17 197.15C377.51 233.98 404.17 341.97 404.17 341.97Z" fill="url(#paint3_linear)"/>
                <path d="M325.35 53H243.95C240.664 53 238 55.6639 238 58.95V68.25C238 71.5361 240.664 74.2 243.95 74.2H325.35C328.636 74.2 331.3 71.5361 331.3 68.25V58.95C331.3 55.6639 328.636 53 325.35 53Z" fill="url(#paint4_linear)"/>
                <path d="M443.912 374C383.511 374 324.976 362.547 279.511 341.434C267.686 336.034 257.039 329.691 247.84 322.569C230.549 321.359 213.894 317.789 199.056 312.109C177.607 304.128 159.75 292.875 147.155 279.404C134.56 265.933 127.64 250.686 127.042 235.088C126.445 219.49 132.189 204.053 143.738 190.221C155.286 176.389 172.262 164.614 193.074 156L199.713 162.267C180.596 170.176 165.003 180.988 154.395 193.691C143.787 206.394 138.511 220.572 139.06 234.896C139.61 249.221 145.967 263.225 157.536 275.595C169.106 287.966 185.509 298.299 205.21 305.626C215.545 309.536 226.823 312.375 238.609 314.033C231.65 306.723 227.552 298.49 226.646 290.003C226.335 283.713 228.264 277.458 232.294 271.691C236.324 265.925 242.355 260.79 249.949 256.659C255.02 253.594 261.136 251.288 267.838 249.915C274.541 248.541 281.654 248.136 288.643 248.728C295.632 249.321 302.315 250.897 308.189 253.338C314.063 255.778 318.975 259.019 322.556 262.817C330.782 270.649 333.715 280.197 330.715 289.376C325.149 305.216 302.503 318.247 274.324 321.791C270.899 322.219 267.435 322.515 263.952 322.677C270.93 327.341 278.58 331.595 286.806 335.383C338.114 359.154 406.987 370.132 475.686 365.356L477 372.833C466.015 373.612 454.968 374.001 443.912 374V374ZM254.167 315.308C260.089 315.415 266.012 315.125 271.835 314.443C295.034 311.526 314.327 300.591 318.822 287.82C321.089 280.598 318.757 273.108 312.322 266.945C309.683 264.055 306.012 261.585 301.595 259.728C297.178 257.87 292.135 256.675 286.858 256.236C281.581 255.797 276.213 256.125 271.172 257.196C266.132 258.266 261.555 260.049 257.798 262.407C251.569 265.766 246.618 269.952 243.304 274.658C239.991 279.365 238.398 284.474 238.643 289.614C239.817 298.925 245.201 307.836 254.167 315.308V315.308Z" fill="white"/>
                <path d="M95.3064 215.34C93.035 210.082 88.2317 205.576 81.757 202.63C73.5914 199.01 63.5714 198.462 54 198C56.5497 199.478 58.2054 201.607 58.6212 203.941C59.2044 206.24 59.1446 208.604 59.6381 210.914C60.8352 215.675 64.2838 219.993 69.4012 223.139C74.5185 226.285 80.9908 228.065 87.7241 228.178C88.9953 223.247 84.1199 218.703 79.5436 214.91C82.1793 215.467 84.5506 216.534 86.3973 217.996C88.244 219.457 89.4947 221.255 90.0123 223.193C90.1973 224.817 90.5119 226.431 90.9545 228.028C91.3732 229.027 93.2426 231.444 95.1569 230.929C96.5477 230.553 96.6524 226.9 96.8169 225.987C97.3127 222.401 96.799 218.78 95.3064 215.34V215.34Z" fill="url(#paint5_linear)"/>
                <path d="M224.694 173.34C226.965 168.082 231.768 163.576 238.243 160.63C246.409 157.01 256.429 156.462 266 156C263.45 157.478 261.795 159.607 261.379 161.941C260.796 164.24 260.855 166.604 260.362 168.914C259.165 173.675 255.716 177.993 250.599 181.139C245.481 184.285 239.009 186.065 232.276 186.178C231.005 181.247 235.88 176.703 240.456 172.91C237.821 173.467 235.449 174.534 233.603 175.996C231.756 177.457 230.505 179.255 229.988 181.193C229.803 182.817 229.488 184.431 229.046 186.028C228.627 187.027 226.757 189.444 224.843 188.929C223.452 188.553 223.348 184.9 223.183 183.987C222.687 180.401 223.201 176.78 224.694 173.34V173.34Z" fill="url(#paint6_linear)"/>
                <defs>
                <linearGradient id="paint0_linear" x1="282.5" y1="46" x2="275.5" y2="376" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7B68EE"/>
                <stop offset="1" stop-color="#4C428A"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="277" y1="376" x2="275.5" y2="46" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7B68EE"/>
                <stop offset="1" stop-color="#CB86F4"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="12625.1" y1="117083" x2="141846" y2="31263.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#010101" stop-opacity="0"/>
                <stop offset="0.95" stop-color="#010101"/>
                </linearGradient>
                <linearGradient id="paint3_linear" x1="302" y1="172.5" x2="302.18" y2="343.86" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="#DADADA"/>
                </linearGradient>
                <linearGradient id="paint4_linear" x1="284.65" y1="53" x2="285" y2="74" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D99FFC"/>
                <stop offset="1" stop-color="#7B68EE"/>
                </linearGradient>
                <linearGradient id="paint5_linear" x1="75.5" y1="198" x2="75.5" y2="231" gradientUnits="userSpaceOnUse">
                <stop stop-color="#C174F0"/>
                <stop offset="0.963542" stop-color="#7B68EE"/>
                </linearGradient>
                <linearGradient id="paint6_linear" x1="244.5" y1="156" x2="244.5" y2="189" gradientUnits="userSpaceOnUse">
                <stop stop-color="#C174F0"/>
                <stop offset="1" stop-color="#7B68EE"/>
                </linearGradient>
                </defs>
                </svg>
            </div>
        `
    }
}


export default Notebook;