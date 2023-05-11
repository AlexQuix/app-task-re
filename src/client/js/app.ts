import FilterForm from './components/FilterForm';
import NotebookCreationForm from './components/NotebookCreationForm';
import GroupNotebook from "./components/GroupNotebook";
import Search from './components/Search';
import TaskService from "./services/task";
import SearchResult from './components/SearchResult';
import { Visibility, isTablet } from './utils';
import { INotebook } from './services/notebook';
import ScrollManager from './components/ScrollManager';

class ButtonNotebookCreation{
    public element: HTMLButtonElement;

    /**
     * This method is call when the button is clicked
     */
    public onClick: ()=>void;

    constructor(){
        this.element = document.querySelector<HTMLButtonElement>("#container-task #btn-new-notebook button");
        this.element.onclick = (function(){
            if(this.onClick) this.onClick();
        }).bind(this);
    }

    changeVisibility(visibilily:Visibility){
        if(visibilily === "hidden")
            return this.element.style.display = "none";

        this.element.style.display = "block";
    }
}

export default class App {
    private static single: App;

    private body: HTMLElement;
    private search: Search;
    private filterForm: FilterForm;
    private searchResult: SearchResult;
    private groupNotebook: GroupNotebook;
    private btnNotebookCreation: ButtonNotebookCreation;
    private notebookForm: NotebookCreationForm;
    private btnFilterTogle: HTMLButtonElement;
    private containerTaskElement: HTMLDivElement;

    private constructor() {
        this.body = document.body;
        this.containerTaskElement = document.querySelector<HTMLDivElement>("#container-task");
        this.btnFilterTogle = document.querySelector<HTMLButtonElement>("#btn-filter-toggle");
        this.btnNotebookCreation = new ButtonNotebookCreation();
        this.search = new Search();
        this.filterForm = new FilterForm();
        this.searchResult = new SearchResult();
        this.groupNotebook = new GroupNotebook();
        this.notebookForm = new NotebookCreationForm();

        // load data
        this.groupNotebook.fetchAndPopulate();

        this.search.onSearch = this.handleSearch.bind(this);
        this.filterForm.onSubmit = this.handleFilterSubmit.bind(this);
        
        this.btnNotebookCreation.onClick = ()=>{
            ScrollManager.lockScroll();
            this.notebookForm.changeVisibility("visible");
        }
        this.notebookForm.onClose = ()=> ScrollManager.unlockScroll();
        this.notebookForm.onCompletedSubmit = (notebookData:INotebook)=>{
            ScrollManager.unlockScroll();
            this.groupNotebook.createAndAppendNotebook(notebookData)
        }
        this.btnFilterTogle.onclick = ()=>{
            let self = this;
            isTablet(()=>{
                self.filterForm.changeVisibily("visible");
            })
        }
    }

    private async handleFilterSubmit(fm:FormData){
        let { priority, created_date } = Object.fromEntries(fm);
        console.log(fm);
        // this.filterForm.changeVisibily("hidden");
    }

    /**
     * Handles the onSearch event and request the task with the taskname provided
     * @param taskName - The taskname to search
     */
    private async handleSearch(taskName:string){
        let { result } = await TaskService.filter({
            title: taskName
        });

        this.searchResult.populate(result);
        this.searchResult.changeVisibility("visible");
        this.btnNotebookCreation.changeVisibility("hidden");        
        this.containerTaskElement.classList.add("container-task--hidden");
    }
}