import NOTEBOOK from '../notebook';
import App from "../app";

// NOTEBOOK
class Form {
    static btnVisible: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#container-task > #btn-create-new-list-task > button");
    private static contParent: HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-notebook");
    private static contForm: HTMLFormElement = Form.contParent.querySelector<HTMLFormElement>("form");
    private static btnClose: HTMLButtonElement = Form.contForm.querySelector<HTMLButtonElement>("#btn-close");
    private static btnCreateNotebook: HTMLButtonElement = Form.contForm.querySelector("#btn-add-notebook");
    constructor() {
        this.start();
    }
    private start() {
        Form.btnCreateNotebook.onclick = (e)=>{
            e.preventDefault();
            NOTEBOOK.createNotebook()
            App.closeEverything();
        };
        Form.btnClose.onclick = Form.close;
        Form.btnVisible.onclick = Form.visible
    }
    private static visible() {
        App.closeEverything();
        Form.Responsive('visible');
    }
    private static close(e) {
        e.preventDefault();
        Form.Responsive('hidden');
    }
    static Responsive(action:'hidden' | 'visible'){
        let div = Form.contParent.style;
        let contForm = Form.contForm.style;

        if(action === 'visible'){
            App.isMatches(()=>{
                div.display = 'grid';
                contForm.transform = "scale(1)";
            }, ()=>{
                div.display = 'grid';
                contForm.transform = "scale(1)";
                div.background = "#000a";
            }); 
        }else if(action === 'hidden'){
            App.isMatches(()=>{
                div.display = 'none';
                contForm.transform = "scale(1)";
                div.background = "transparent";
            }, ()=>{
                contForm.transform = "scale(0)";
                div.display = 'none';
                div.background = "transparent";
            }); 
        }
    }
    static async getForm() {
        let input = Form.contForm.querySelector<HTMLInputElement>("#name");
        let json = JSON.stringify({
            name: input.value
        });
        App.closeEverything();
        let result = await this.sendData('POST', json);
        if(result.n && result.ok){
            input.value = '';
            return result.ops[0];
        }
    }
    static async fetchData(method: string, params: string = '') {
        let res = await fetch(`/api/notebooks/${params}`, {
            method
        });
        let json = res.json();
        return json;
    }
    static async sendData(method: string, body: string): Promise<any> {
        let res = await fetch(`/api/notebooks`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
        let json = await res.json();
        return json;
    }

}

export default Form;