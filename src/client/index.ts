// //CSS
import './style/home.css';
import './style/responsive.css'
console.log('Hola')

// JS
import App from './js/app';


// INITIALIZER APP
function initApp() {
    new App();
    matchMedia("(max-width: 500px)").onchange = App.adaptViewport;
}



window.onload = initApp;