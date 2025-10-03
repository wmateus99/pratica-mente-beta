import { getFileName } from "./src/js/get-file-name.js";
import { setFavicon } from "./src/js/set-favicon.js";
import { navMenu } from "./src/js/nav-menu.js";
import { banner } from "./src/js/banner.js";
// import { cardAnimation } from "./src/js/card-animation.js";

document.addEventListener("DOMContentLoaded", () => {

    banner();

    const logo = document.querySelector('.logo');

    document.title = getFileName();
    setFavicon("/public/img/logo.svg");
    navMenu()
    // cardAnimation()

    const spanVersion = document.createElement('a');
    spanVersion.href = "/src/pages/data-users/users.html";
    spanVersion.className = "version";
    spanVersion.textContent = "Versão 6"
    document.body.appendChild(spanVersion)

    logo.addEventListener("click", () => {
        window.location.href = "/index.html";
    })
})
