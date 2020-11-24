import { debug } from 'webpack';
import TASK from './task';
import FORM from './components/formNotebook';
import App from './app';

const Form = new FORM();

interface IContentTask {
    notebook: string;
    title: string;
    priority: string;
    description: string;
}





class Notebook {
    protected NotebookID:string;
    private contNotebook: HTMLDivElement;
    private contentAllTasks: HTMLDivElement;
    static contentAllNotebook: HTMLDivElement = document.querySelector<HTMLDivElement>('#container-task > #cont-all-task-lists');
    constructor(id: string) {
        this.NotebookID = id;
        this.contNotebook = document.getElementById(id) as HTMLDivElement;
        this.start();
    }
    private async start() {
        await TASK.fetchDataOfTask(this.NotebookID);
    }
    static async fetchDataOfNotebook(){
        let json = await Form.fetchData('GET');
        for(let notebook of json){
            Notebook.insertNotebook(notebook)
        }
    }
    static async insertNotebook(json) {
        let structureHTML = Notebook.structureHTML(json);

        let notebook = document.createElement("list-task");
        notebook.className = 'cont-list-task';
        notebook.id = (json._id as string);
        notebook.innerHTML = structureHTML;

        this.contentAllNotebook.appendChild(notebook);
        new Notebook(json._id);
    }
    private static structureHTML(json): string {
        return `
            <div id="name-list-task">
                <div id="name-list-task-flex">
                    <header><h1>${json.name}</h1></header>
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
        `
    }
}


export default Notebook;