// Pega o caminho do arquivo (ex: /pasta/atividade1.html)
const caminho = window.location.pathname;

// Separa só o nome do arquivo (ex: atividade1.html)
const nomeArquivo = caminho.split("/").pop();

// Remove a extensão .html (fica só "atividade1")
const nomeSemExtensao = nomeArquivo.replace(".html", "");

// Coloca no span com id "number-atividade"
document.getElementById("number-atividade").textContent = nomeSemExtensao;
