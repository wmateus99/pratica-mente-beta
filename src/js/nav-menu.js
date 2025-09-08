export function navMenu() {
    const navRight = document.querySelector('.nav-rigth');
    const navBar = document.querySelector('.navbar');

    let menuOpen = false;

    // Inicializa ícone conforme viewport
    const setMenuIcon = () => {
        if (window.innerWidth < 650) {
            navRight.innerHTML = `<i class="ri-menu-line"></i>`;
        } else {
            navRight.innerHTML = `<a href="/src/pages/sobre/sobre.html"><i class="ri-user-star-line"></i></a>`;
            menuOpen = false;
        }
    };

    setMenuIcon();

    // Toggle menu ao clicar no ícone
    navRight.addEventListener("click", (e) => {
        if (window.innerWidth >= 650) return; // Ignora desktop
        menuOpen = !menuOpen;
        navBar.style.display = menuOpen ? "block" : "none";
        navRight.innerHTML = `<i class="${menuOpen ? 'ri-close-large-line' : 'ri-menu-line'}"></i>`;
        e.stopPropagation(); // Evita disparar evento global
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
        if (window.innerWidth >= 650) return; // Ignora desktop
        if (!menuOpen) return;

        // Verifica se o clique não foi dentro do navBar nem no navRight
        if (!navBar.contains(e.target) && !navRight.contains(e.target)) {
            navBar.style.display = "none";
            navRight.innerHTML = `<i class="ri-menu-line"></i>`;
            menuOpen = false;
        }
    });

    // Ajuste ao redimensionar
    window.addEventListener("resize", () => {
        if (window.innerWidth < 650) {
            gsap.to(navRight, { rotation: 180, duration: 0.3 });
        } else {
            gsap.to(navRight, { rotation: 0, duration: 0.3 });
        }
        setMenuIcon();
    });
}
