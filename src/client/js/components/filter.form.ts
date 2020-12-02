import App from '../app';
import FILTER from '../filter';



class Form {
    contForm: HTMLUListElement;
    inputNameNotebook: HTMLInputElement;
    inputDate: HTMLInputElement;
    inputPriority: HTMLSelectElement;
    btnSend: HTMLButtonElement;
    constructor() {
        this.contForm = FILTER.contFilter.querySelector('#contaner-filter-search > ul');
        this.inputNameNotebook = this.contForm.querySelector('#name_notebook > input');
        this.inputDate = this.contForm.querySelector('#date > input');
        this.inputPriority = this.contForm.querySelector('#priority');
        this.btnSend = this.contForm.querySelector('#btn-filter-search > button');
        this.start();
    }
    start() {
        this.btnSend.onclick = this.sendData.bind(this);
    }
    async sendData() {
        App.removeNotResult();
        App.closeEverything();
        let data = this.getForm();
        let uri = `/api/search?${(data.namenotebook)?'name_notebook=' + data.namenotebook:''}${(data.priority) ? '&priority=' + data.priority : ''}${(data.date) ? '&date=' + data.date : ''}`;
        let res = await fetch(uri);
        let json = await res.json();

        FILTER.sendDataAtApp(json);
    }
    getForm() {
        let namenotebook = this.inputNameNotebook.value;
        let date = this.inputDate.value;
        let priority = this.inputPriority.value;

        return { namenotebook, date, priority };
    }
}

export default Form;