import { criarFooter } from "./src/js/footer.js"
import { criarMenu } from "./src/js/nav-menu.js"
import { cardsProntos } from './src/js/cardsLista.js';

const favicon = document.createElement('link');
favicon.rel = "shortcut icon";
favicon.href = "/public/img/logo_icone_praticamente_white.svg";
favicon.type = "image/x-icon"



window.addEventListener("DOMContentLoaded", () => {
    document.head.appendChild(favicon)
    document.title = "PraticaMente"
    criarMenu()
    criarFooter()


    cardsProntos.forEach(({ container, card }) => {
        const divDestino = document.querySelector(container);
        if (divDestino) {
            divDestino.appendChild(card);
        }
    });
})
