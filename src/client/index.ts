// //CSS
// import './style/home.css';
// import './style/responsive.css'


// JS
import Navegation from './js/navegation';
import App from './js/app';


// INITIALIZER APP
function initApp() {
    new App();
    matchMedia("(max-width: 500px)").onchange = App.adaptViewport;
}



window.onload = initApp;