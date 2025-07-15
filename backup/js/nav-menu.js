export function criarMenu() {
    const navMenu = document.querySelector(".nav-menu")
    navMenu.innerHTML = `<a href="/index.html">Início</a>
                        <a href="">Atividades</a>
                        <a href="/pages/revisao.html">Revisão</a>
                        <a href="">Textos</a>`
}