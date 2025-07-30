import { criarFooter } from "./src/js/footer.js"
import { criarMenu } from "./src/js/nav-menu.js"
import { cardsProntos } from './src/js/cardsLista.js';
import './src/js/loader.js'


window.addEventListener("DOMContentLoaded", () => {
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
