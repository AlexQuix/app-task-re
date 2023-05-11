import { Visibility, isTablet } from '../utils';
import { isMobile } from '../utils';

import App from '../app';
import ScrollManager from './ScrollManager';



export default class FilterForm {
    public containerElement: HTMLDivElement;
    public element: HTMLFormElement;
    public btnSend: HTMLButtonElement;
    public btnClose: HTMLButtonElement;

    public onSubmit: (fm:FormData)=>void;
    public onClose: ()=>void;

    constructor() {
        this.element = document.querySelector('#container-filter form');
        this.btnClose = this.element.querySelector<HTMLButtonElement>("#btn-close");

        this.btnClose.onclick = this.handleCloseClick.bind(this);
        this.element.onsubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.changeVisibily("hidden");
        
        if(this.onClose) this.onClose();
    }

    handleCloseClick(e){
        e.preventDefault();
        this.changeVisibily("hidden");

        if(this.onSubmit) this.onSubmit(this.getFormData());
    }

    changeVisibily(visibilily:Visibility) {
        if(visibilily === 'visible'){
            isTablet(()=>{
                ScrollManager.lockScroll();
                this.element.style.left = "0%";
            })
        }
        
        if(visibilily === 'hidden'){
            isTablet(()=>{
                ScrollManager.unlockScroll();
                this.element.style.left = "-100%";
            });
        }
    }

    getFormData(){
        return new FormData(this.element);
    }
}