import e from 'express';
import FORM from './components/filter.form';
import NOTEBOOK from './notebook';
import TASK from './task';

type SendData = {
    notebook: DataNotebook[];
    task: DataTask[];
}
type DataNotebook = {
    _id: string;
    name: string;
    list_task?: DataTask[];
}
type DataTask = {
    _id: string;
    title: string;
    priority: string;
    description: string;
    _id_notebook:string;
}


class Filter{
    static contFilter:HTMLDivElement = document.querySelector('#contaner-filter-search');;
    constructor(){
        this.start();
    }
    start(){
        new FORM();
    }
    static evaluationForInsert(json:SendData){
        NOTEBOOK.removeAll();
        if(json.notebook){
            for(let datanotebook of json.notebook){
                NOTEBOOK.appendChild(datanotebook);
                new NOTEBOOK(datanotebook, false);
                for(let datatask of datanotebook.list_task){
                    new TASK(datatask);
                }
            }
        }else if(json.task){

        }
    }
    static Responsive(){
        let contInputsFilter = document.querySelector<HTMLUListElement>("#contaner-filter-search > ul");
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

export default Filter;