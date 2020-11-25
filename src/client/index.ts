// //CSS
// import './style/home.css';
// import './style/responsive.css'


// JS
import Navegation from './js/navegation';
import RESPONSIVE from './js/components/responsive';
import App from './js/app';


// INITIALIZER APP
function initApp() {
    handleContentNavegation();
    handleContentFilter();
    handleContentTask();
    matchMedia("(max-width: 500px)").onchange = RESPONSIVE.start;
}


// HANDLE CONTAINER NAVEGATION
function handleContentNavegation(): void {
    let contInputSearch = document.querySelector<HTMLInputElement>("#container-nav > nav > ul > #link-search > a > input");
    if (matchMedia("(max-width: 500px)").matches) {
        let btnSearch = document.querySelector<HTMLSpanElement>("#container-nav > nav > ul > #link-search > a > span");
        btnSearch.onclick = () => {
            contInputSearch.style.width = "200px";
            contInputSearch.style.padding = "5px 20px";
            contInputSearch.style.paddingRight = "70px";
        }
    }
}



// HANDLE CONTAINER FILTER
function handleContentFilter(): void {
    RESPONSIVE.handleFilterContent();
}


//HANDLE CONTAINER TASK
function handleContentTask(): void {
    new App();
    RESPONSIVE.enableResponsive();
};




window.onload = initApp;