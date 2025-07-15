export function criarFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-section">
                <h3><a href="/pages/sobre.html">Sobre</a></h3>
                <p>Saiba mais sobre o objetivo deste site e quem desenvolveu.</p>
            </div>
            <div class="footer-section">
                <h3><a href="/pages/creditos.html">Créditos</a></h3>
                <p>Veja as pessoas e tecnologias envolvidas no projeto.</p>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}
