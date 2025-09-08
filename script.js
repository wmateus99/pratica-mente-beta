import { getFileName } from "./src/js/get-file-name.js";
import { setFavicon } from "./src/js/set-favicon.js";
import { navMenu } from "./src/js/nav-menu.js";
// import { cardAnimation } from "./src/js/card-animation.js";

document.addEventListener("DOMContentLoaded", () => {
    document.title = getFileName();
    setFavicon("/public/img/logo.svg");
    navMenu()
    // cardAnimation()
})