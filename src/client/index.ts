// //CSS
import './style/home.css';

// JS
import App from './js/app';
import NotebookCreationForm from './js/components/NotebookCreationForm';


// INITIALIZER APP
function initApp() {
    new App();
    // matchMedia("(max-width: 500px)").onchange = App.adaptViewport;
}

window.onload = initApp;