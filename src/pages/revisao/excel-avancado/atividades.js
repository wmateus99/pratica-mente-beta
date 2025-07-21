// Pega o caminho do arquivo (ex: /pasta/atividade1.html)
const caminho = window.location.pathname;

// Separa só o nome do arquivo (ex: atividade1.html)
const nomeArquivo = caminho.split("/").pop();

// Remove a extensão .html (fica só "atividade1")
const nomeSemExtensao = nomeArquivo.replace(".html", "");

// Coloca no span com id "number-atividade"
document.getElementById("number-atividade").textContent = nomeSemExtensao;


// Swal.fire({
//     icon: 'warning',
//     title: 'Atenção!',
//     html: `
//         Esta atividade foi pensada para você resolver <b>sozinho</b>.<br><br>
//         Enfrentar os desafios por conta própria vai te ajudar a <b>aprender de verdade</b>,
//         desenvolver raciocínio lógico e se tornar mais confiante.<br><br>
//         Se tiver dúvidas, use o <b>material didático</b> ou faça pesquisas.<br><br>
//         Lembre-se: <em>cada problema resolvido por você é uma conquista!</em>
//     `,
//     confirmButtonText: 'Entendi',
//     confirmButtonColor: '#f39c12'
// });
