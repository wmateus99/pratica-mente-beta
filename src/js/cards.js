export function criarCard({classAdd, titulo, descricao, imagem, link }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-top ${classAdd}">
            <img src="${imagem}" alt="">
        </div>
        <div class="card-bottom">
            <h3>${titulo}</h3>
            <span>${descricao}</span>
        </div>
    `;
    card.addEventListener("click", () => {
        window.location = link
    })
    return card;
}
