export function criarMenu() {
    const navMenu = document.querySelector(".nav-menu")
    navMenu.innerHTML = `<a href="/index.html">Início</a>
                        <a href="/src/pages/auxiliares.html">Auxiliares</a>
                        <a href="/src/pages/revisao.html">Revisão</a>
                        <a href="/src/pages/provas/informatica-essencial.html">Prova</a>
                        <a href="/src/pages/textos.html">Textos</a>`
}