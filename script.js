import { criarFooter } from "./js/footer.js"
import { criarMenu } from "./js/nav-menu.js"


window.addEventListener("DOMContentLoaded", () => {
    document.title = "PraticaMente"
    criarMenu()
    criarFooter()
})