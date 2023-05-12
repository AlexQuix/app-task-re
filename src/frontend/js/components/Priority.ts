export enum PriorityLevel {
    HIGH = "high",
    URGENT = "urgent",
    MEDIUM = "medium",
    LOW = "low",
    NOT_IMPORTANT = "none"
}

export enum PriorityLevelColor {
    HIGH = "#ED1A72",
    URGENT = "#EDD81A",
    MEDIUM = "#6FDDFF",
    LOW = "#939393",
    NOT_IMPORTANT = "#303030"
}


export default class Priority{
    public element: HTMLLIElement;
    /**
     * This event will be execute when the user click the priority element.
     */
    public onClick: ()=>void;

    constructor(
        public priorityLevel: PriorityLevel,
        public background: PriorityLevelColor,
        public title: string,
        public svg: string
    ){
        this.element = this.createElement();
        this.element.addEventListener("click", this.handleClick.bind(this));
    }

    handleClick(){
        if(this.onClick) this.onClick();
    }

    createElement(){
        let content = this.template();
        let priorityElement = document.createElement("li");
        priorityElement.classList.add("priority");
        priorityElement.innerHTML = content;
        return priorityElement;
    }

    template(){
        return `
            ${ this.svg }
            <span>${this.title}</span>
        `;
    }
}