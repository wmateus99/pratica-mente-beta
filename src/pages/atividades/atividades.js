import { setFavicon } from "/src/js/set-favicon.js";

document.addEventListener("DOMContentLoaded", () => {
    document.title = "PraticaMente"
    setFavicon("/public/img/logo.svg");
})