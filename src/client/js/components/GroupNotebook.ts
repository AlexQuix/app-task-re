import { INotebook } from "../services/notebook";
import NotebookService from "../services/notebook";
import { Visibility } from "../utils";
import Notebook from "./Notebook";


/**
 * Represents the group notebok element.
 */
export default class GroupNotebook{
    private element: HTMLDivElement;

    constructor(){
        this.element = document.querySelector<HTMLDivElement>('#container-task > .group-notebook');
    }

    /**
     * Asynchronously fetch notebooks and populates the UI with the notebook data
     */
    async fetchAndPopulate(){
        try{
            let {result} = await NotebookService.filterByName("");
            if(result) this.populate(result);
        }catch(e){
            console.error(e);
        }
    }

    /**
     * Changes the element visibility
     * @param {Visibility} visibilily - the value of the visibility, if it is hidden will hide the element, otherwise shows the element
     */
    changeVisibility(visibilily:Visibility){
        if(visibilily === "visible")
            return this.element.style.display = "block";

        if(visibilily === "hidden")
            return this.element.style.display = "none";
    }

    /**
     * Creates a notebook and append it to the Group Notebook element
     */
    createAndAppendNotebook(idOrData: string | INotebook){
        let notebook = new Notebook(idOrData as INotebook);
        notebook.onAfterCreatedElement = async ()=>{
            this.appendNotebook(notebook.element);
            notebook.onDelete = this.handleDeletedNotebook.bind(this, notebook);
        }
    }

    /**
     * Populate the element with notebooks elements based on the provided notebook data.
     * @param {INotebook[]} notebooks - An array of notebook data objects to populate the container with
     */
    populate(notebooks:INotebook[]){
        for(const notebookData of notebooks){
            this.createAndAppendNotebook(notebookData._id);
        }
    }

    /**
     * Handles the delete event of notebook and removes the provided notebook
     * @param notebook 
     */
    private async handleDeletedNotebook(notebook:Notebook){
        this.removeNotebook(notebook.element);
    }

    /**
     * Removes all children from GroupNotebook element
     */
    clean(){
        this.element.innerHTML = "";
    }    

    /**
     * Removes the specified notebook element from the GroupNotebook element.
     * @param {HTMLElement} notebook - The notebook element to remove.
     */
    removeNotebook(notebook:HTMLElement){
        this.element.removeChild(notebook);
    }

    /**
     * Append a Notebook element to element
     * @param {Notebook} notebook - The HTMLElement that will be use to append to the GroupNotebook element
     */
    appendNotebook(notebook:HTMLElement){
        this.element.appendChild(notebook);
    }
}