export function criarMenu() {
    const navMenu = document.querySelector(".nav-menu")
    navMenu.innerHTML = `<a href="/index.html">Início</a>
                        <a href="/src/pages/auxiliares.html">Auxiliares</a>
                        <a href="/src/pages/revisao.html">Revisão</a>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeQ3yRtgFmXARiRfHZWuOdGw8eTfG9rKPg6Gu_sxx_ga-Iw7Q/viewform">Prova</a>
                        <a href="/src/pages/textos.html">Textos</a>`
}