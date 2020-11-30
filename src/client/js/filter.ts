import e from 'express';
import App, { SendData } from './app';
import FORM from './components/filter.form';



class Filter {
    static contFilter: HTMLDivElement = document.querySelector('#contaner-filter-search');
    static contInputs = document.querySelector<HTMLUListElement>("#contaner-filter-search > ul");
    static btn = document.querySelector<HTMLButtonElement>("#contaner-filter-search > #cont-btn-filter");
    static btnClose = document.querySelector<HTMLButtonElement>("#contaner-filter-search > ul > #cont-btn-close");
    constructor() {
        this.start();
    }
    start() {
        new FORM();
        Filter.btn.onclick = ()=>{
            App.closeEverything();
            Filter.Responsive('visible')
        };
        Filter.btnClose.onclick = ()=>{
            Filter.Responsive('hidden');
        }
    }
    static sendDataAtApp(json: SendData) {
        App.evaluationForInsert(json);
    }
    static Responsive(action:'visible'|'hidden') {
        if(action === 'visible'){
            App.isMatches(()=>{
                Filter.contInputs.style.left = "0%";
            })
        }else if(action === 'hidden'){
            App.isMatches(()=>{
                Filter.contInputs.style.left = "-100%";
            });
        }

    }
}

export default Filter;