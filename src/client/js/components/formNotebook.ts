import NOTEBOOK from '../notebook';
import App from "../app";

// NOTEBOOK
class Form {
    private btnVisible: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#container-task > #btn-create-new-list-task > button");
    private container: HTMLDivElement = document.querySelector<HTMLDivElement>("#container-task > #form-create-notebook");
    private contForm: HTMLFormElement = this.container.querySelector<HTMLFormElement>("form");
    private btnClose: HTMLButtonElement = this.contForm.querySelector<HTMLButtonElement>("#btn-close");
    private btnCreateNewNotebook: HTMLButtonElement = this.contForm.querySelector("#btn-add-notebook");
    constructor() {
        this.start();
    }
    private start() {
        this.visible();
        this.close();
        this.btnHandleOnclick();
    }
    private visible() {
        this.btnVisible.onclick = () => {
            App.closeAll();
            if (getComputedStyle(this.container).left !== "0px") {
                this.container.style.left = "0px";
                this.container.style.background = "#000a";
            }
        }
    }
    private close() {
        this.btnClose.onclick = (e) => {
            e.preventDefault();
            if (getComputedStyle(this.container).left === "0px") {
                this.container.style.left = "-100%";
                this.container.style.background = "transparent";
            }
        }
    }
    private async getForm() {
        let name = this.contForm.querySelector<HTMLInputElement>("#name").value;
        let json = JSON.stringify({
            name
        })
        return await this.sendData('POST', json);
    }
    private async btnHandleOnclick() {
        this.btnCreateNewNotebook.onclick = async (e) => {
            e.preventDefault();
            let json = await this.getForm();
            await NOTEBOOK.insertNotebook(json);
        }
    }
    async fetchData(method: string, params: string = '') {
        let res = await fetch(`/api/notebooks/${params}`, {
            method
        });
        let json = res.json();
        return json;
    }
    async sendData(method: string, body: string): Promise<any> {
        let res = await fetch(`/api/notebooks`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
        let json = await res.json();
        return json.ops[0];
    }
}

export default Form;