import { ITask } from "../services/task";
import { Visibility } from "../utils";
import GroupTask from "./GroupTask";
import NotResult from "./NotResult";

export type SearchResultTemplate  = "none" | "notebooks"

/**
 * Represents the search result element.
 */
export default class SearchResult{
    public element: HTMLDivElement;
    public lastAppendChild: HTMLElement | undefined;
    public notResult: NotResult;

    constructor(){
        this.element = document.querySelector('#search-result');
        this.notResult = new NotResult();
    }

    /**
     * Populates the search result element with tasks data or a "not result" message.
     * @param {ITask[]} tasks - The tasks data to display.
     */
    populate(tasks:ITask[]){
        let elementToAppend: HTMLElement;
        if(tasks.length < 1)
            elementToAppend = this.notResult.element;
        else
            elementToAppend = new GroupTask(tasks).element;


        if(this.lastAppendChild) 
            this.replaceChild(this.lastAppendChild, elementToAppend);
        else 
            this.appendChild(elementToAppend);
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
     * Removes the child element from the SearchResult element
     * @param {HTMLElement} child - The child to be removed 
     */
    removeChild(child:HTMLElement){
        this.lastAppendChild = null;
        this.element.removeChild(child);
    }

    /**
     * Appends the child element to the SearchResult element
     * @param {HTMLElement} child - The child to be append
     */
    appendChild(child:HTMLElement){
        this.lastAppendChild = child;
        this.element.append(child);
    }
    
    /**
     * Replaces the old child element with the new chlld element
     * @param {HTMLElement} oldChild - The child to be removed 
     * @param {HTMLElement} newChild - The child to be append
     */
    replaceChild(oldChild:HTMLElement, newChild:HTMLElement){
        this.removeChild(oldChild);
        this.appendChild(newChild);
    }


}