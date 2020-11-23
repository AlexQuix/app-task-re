import 'regenerator-runtime';
import 'core-js';

// //CSS
// import './style/home.css';
// import './style/responsive.css'


// JS
import Navegation from './js/navegation';
import RESPONSIVE from './js/responsive';
import NOTEBOOK from './js/notebook';


// INITIALIZER APP
function initApp() {
    handleContentNavegation();
    handleContentFilter();
    handleContentTask();
    matchMedia("(max-width: 500px)").onchange = initApp;
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
    RESPONSIVE.visibleULFilter();
}


//HANDLE CONTAINER TASK
function handleContentTask(): void {
    NOTEBOOK.startForm();
    RESPONSIVE.EnableConfigTask();
    new NOTEBOOK().start();
};




window.onload = initApp;