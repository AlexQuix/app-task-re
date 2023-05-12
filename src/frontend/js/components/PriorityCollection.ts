import Priority from "./Priority";

export default class PriorityCollection{
    public element: HTMLUListElement;
    
    /**
     * This event will be execute when the user select a priority element from collection element.
     */
    onSelected: (prioritySelected: Priority) => void;

    constructor(
        public priorities: Priority[]
    ){
        this.element = this.createElement();
        this.populate(priorities);
    }

    populate(priorities: Priority[]){
        for (const priority of priorities) {
            this.append(priority.element);
            priority.onClick = this.handleSelected.bind(this, priority);
        }
    }

    /**
     * Handles the event click of the priority
     * @param prioritySelected - The priority selected value
     */
    handleSelected(prioritySelected: Priority){
        console.log("bind");
        if(this.onSelected) this.onSelected(prioritySelected);
    }

    private createElement(){
        let element = document.createElement("ul");
        element.id = "priority-collection";
        return element;
    }

    private append(element:HTMLElement){
        this.element.appendChild(element)
    }
}