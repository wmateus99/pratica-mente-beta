import { wordEasy } from "../../js/words_game/easy.js";
import { wordNormal } from "../../js/words_game/normal.js";
import { wordHardcore } from "../../js/words_game/hardcore.js";

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqrtUfo7aAfySvWPQ8nLqRdH1Dt-yjDlY",
    authDomain: "game-digitacao-4285e.firebaseapp.com",
    projectId: "game-digitacao-4285e",
    storageBucket: "game-digitacao-4285e.appspot.com",
    messagingSenderId: "569609192666",
    appId: "1:569609192666:web:84393a4b4ae0dfea3191e3",
    measurementId: "G-QBGVE2H3J8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
getAnalytics(app);

window.firebaseDb = db;
window.firebaseTools = { collection, doc, getDoc, setDoc, getDocs };

// --- Variáveis do jogo ---
let pontos = 0;
let palavraAtual = "";
let tempo = 60;
let intervalo;
let emAndamento = false;
let jogoEncerrado = false;

let palavras = wordNormal;
let nivelAtual = "Normal"; // padrão
const temposNivel = { "Fácil": 90, "Normal": 60, "Hardcore": 45 };

// --- Seleção de elementos ---
const spanPalavra = document.getElementById("palavra");
const spanPontos = document.getElementById("pontos");
const spanTempo = document.getElementById("tempo");
const input = document.getElementById("entrada");
const btnControle = document.getElementById("btnControle");
const btnDesistir = document.getElementById("btnDesistir");
const btnSalvar = document.getElementById("btnSalvar");
const status = document.getElementById("status");
const botoesNivel = document.querySelectorAll(".btn-nivel");

// --- Botão ativo ---
function atualizarBotaoAtivo(botaoAtivo){
    botoesNivel.forEach(btn => btn.classList.remove("ativo"));
    botaoAtivo.classList.add("ativo");
}
atualizarBotaoAtivo(botoesNivel[1]); // Normal ativo

// --- Seleção de nível ---
botoesNivel.forEach(btn => {
    btn.addEventListener("click", () => {
        const nivel = btn.textContent.trim();
        if(emAndamento && !jogoEncerrado){
            Swal.fire("Atenção","Não é possível mudar o nível enquanto o jogo está em andamento!","warning");
            return;
        }
        switch(nivel){
            case "Fácil": palavras = wordEasy; break;
            case "Normal": palavras = wordNormal; break;
            case "Hardcore": palavras = wordHardcore; break;
        }
        nivelAtual = nivel;
        atualizarBotaoAtivo(btn);
        pontos = 0;
        tempo = temposNivel[nivelAtual];
        spanPontos.textContent = pontos;
        atualizarTempo();
        spanPalavra.textContent = "-";
        input.value = "";
        input.disabled = true;
        emAndamento = false;
        jogoEncerrado = false;
        btnControle.textContent = "Iniciar";
        status.textContent = "Selecione Iniciar para jogar";
        listarJogadores(nivelAtual);
    });
});

// --- Funções do jogo ---
function novaPalavra(){
    const indice = Math.floor(Math.random()*palavras.length);
    palavraAtual = palavras[indice];
    if(Math.random()<0.5) palavraAtual = palavraAtual.charAt(0).toUpperCase() + palavraAtual.slice(1);
    spanPalavra.innerHTML="";
    for(let letra of palavraAtual){
        const span = document.createElement("span");
        span.textContent = letra;
        span.className="letter";
        spanPalavra.appendChild(span);
    }
    input.value="";
    input.focus();
}
function atualizarTempo(){ spanTempo.textContent = tempo; }
function iniciarTimer(){
    clearInterval(intervalo);
    intervalo = setInterval(()=>{
        tempo--;
        atualizarTempo();
        if(tempo<=0){ clearInterval(intervalo); encerrarJogo(); }
    },1000);
}
function encerrarJogo(){
    status.textContent = "Fim de jogo!";
    spanPalavra.textContent = "-";
    input.disabled = true;
    emAndamento = false;
    jogoEncerrado = true;
    btnControle.textContent = "Reiniciar";
    if(pontos>=10) salvarProgresso();
}
function checkMatch(){
    const typed = input.value;
    const letters = spanPalavra.querySelectorAll("span");
    for(let i=0;i<letters.length;i++){
        if(i<typed.length) letters[i].className = typed[i]===palavraAtual[i]?"letter correct":"letter incorrect";
        else letters[i].className="letter";
    }
    if(typed===palavraAtual){
        pontos++;
        spanPontos.textContent = pontos;
        if(pontos%10===0){ tempo = temposNivel[nivelAtual]; atualizarTempo(); }
        novaPalavra();
    }
}
input.addEventListener("input", ()=>{ if(emAndamento && !jogoEncerrado) checkMatch(); });

// --- Botão Controle e Tecla Espaço ---
btnControle.addEventListener("click", controleJogo);
document.addEventListener("keydown",(e)=>{
    if(e.code==="Space"){ e.preventDefault(); controleJogo(); }
});
function controleJogo(){
    if(!emAndamento && !jogoEncerrado && pontos===0 && tempo===temposNivel[nivelAtual]) iniciarPartida();
    else if(emAndamento){
        clearInterval(intervalo); emAndamento=false; input.disabled=true;
        btnControle.textContent="Retomar"; status.textContent="Pausado";
    }
    else if(!emAndamento && !jogoEncerrado){
        emAndamento=true; input.disabled=false; btnControle.textContent="Pausar"; status.textContent="Jogando...";
        iniciarTimer(); input.focus();
    }
    else if(jogoEncerrado) iniciarPartida();
}
function iniciarPartida(){
    pontos=0; tempo=temposNivel[nivelAtual]; spanPontos.textContent=pontos;
    atualizarTempo(); input.disabled=false; emAndamento=true; jogoEncerrado=false;
    btnControle.textContent="Pausar"; status.textContent="Jogando...";
    novaPalavra(); iniciarTimer(); input.focus();
}

// --- Botão Desistir ---
btnDesistir.addEventListener("click",()=>{ if(emAndamento) tempo=1; });

// --- Botão Salvar ---
btnSalvar.addEventListener("click",()=>{ if(jogoEncerrado && pontos>=10) salvarProgresso(); });

// --- Salvar progresso ---
async function salvarProgresso(){
    const { doc, setDoc, getDoc } = window.firebaseTools;
    const { value: formValues } = await Swal.fire({
        title:"Salve seu progresso",
        html:'<input id="swal-nome" class="swal2-input" placeholder="Digite seu nome completo">'+
            '<input id="swal-codigo" class="swal2-input" placeholder="Digite seu código do curso">',
        focusConfirm:false,
        showCancelButton:true,
        confirmButtonText:"Salvar",
        preConfirm:()=>{
            const nome=document.getElementById("swal-nome").value.trim();
            const codigo=document.getElementById("swal-codigo").value.trim();
            if(!nome||!codigo){ Swal.showValidationMessage("Preencha todos os campos"); return false; }
            return {nome,codigo};
        }
    });
    if(!formValues) return;
    const { nome,codigo } = formValues;
    const ref = doc(db,"jogadores",codigo);
    const snapshot = await getDoc(ref);
    const dados = { score: pontos, dificuldade: nivelAtual };
    if(!snapshot.exists()) dados.nome = nome;
    await setDoc(ref,dados,{merge:true});
    Swal.fire("Sucesso","Progresso salvo!","success");
    listarJogadores(nivelAtual);
}

// --- Ranking ---
async function listarJogadores(nivelFiltro="Normal"){
    const { collection,getDocs } = window.firebaseTools;
    const jogadoresCol = collection(db,"jogadores");
    const snapshot = await getDocs(jogadoresCol);
    const lista=[];
    snapshot.forEach(doc=>{
        const data=doc.data();
        if(data.dificuldade===nivelFiltro) lista.push({nome:data.nome||"Sem nome", score:data.score||0});
    });
    const ordenada = lista.sort((a,b)=>b.score-a.score);
    // Top 3
    const top3 = ordenada.slice(0,3);
    const topLi = document.querySelectorAll(".ranking-list li");
    topLi.forEach((li,idx)=>{
        const jogador = top3[idx];
        if(jogador){
            const nomes = jogador.nome.split(" ").slice(0,2).join(" ");
            li.querySelector(".name").textContent = nomes;
            li.querySelector(".score").textContent = jogador.score;
        } else { li.querySelector(".name").textContent = "-"; li.querySelector(".score").textContent = "-"; }
    });
    // Ranking Geral
    const tbody = document.querySelector(".ranking.right tbody");
    tbody.innerHTML="";
    ordenada.forEach((jogador,idx)=>{
        const nomes = jogador.nome.split(" ").slice(0,2).join(" ");
        const tr = document.createElement("tr");
        tr.innerHTML=`<td data-label="#">${idx+1}</td><td data-label="Nome">${nomes}</td><td data-label="Pontos">${jogador.score}</td>`;
        tbody.appendChild(tr);
    });
}

// --- Inicializa ---
listarJogadores("Normal");
