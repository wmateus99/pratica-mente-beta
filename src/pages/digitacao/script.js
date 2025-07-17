

document.addEventListener('DOMContentLoaded', () => {
    // Theme switching functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Set cyan as default theme
    document.body.classList.add('cyan-theme');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            
            // Remove all theme classes
            document.body.classList.remove('light-theme', 'cyan-theme', 'pink-theme', 'green-theme', 'orange-theme');
            
            // Add the selected theme class (except for dark which is default)
            if (theme !== 'dark') {
                document.body.classList.add(`${theme}-theme`);
            }
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Save theme preference
            localStorage.setItem('preferred-theme', theme);
        });
    });
    
    // Load saved theme preference or set cyan as default
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (themeOption) {
            themeOption.click();
        }
    } else {
        // Set cyan as default if no saved preference
        const cyanOption = document.querySelector('.theme-option[data-theme="cyan"]');
        if (cyanOption) {
            cyanOption.click();
        }
    }
    
    // Rest of the code remains unchanged
    // Elementos do DOM
    const wordDisplay = document.getElementById('word-display');
    const wordInput = document.getElementById('word-input');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const desistirBtn = document.getElementById('desistir-btn');
    
    // Novos elementos para o progresso
    const progressBar = document.getElementById('progress-bar');
    const wordsCount = document.getElementById('words-count');
    const wordsTarget = document.getElementById('words-target');

    // Variáveis do jogo
    let currentWord = '';
    let score = 0;
    let level = 1;
    let timeLeft = 90;
    let maxTime = 90;
    let minTime = 45;
    let isPlaying = false;
    let isPaused = false;
    let timer;
    const wordsPerLevel = 10; // Palavras necessárias para subir de nível

    // Inicializar o jogo
    function init() {
        score = 0;
        level = 1;
        timeLeft = 90;
        maxTime = 90;
        
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timeDisplay.textContent = timeLeft;
        
        // Inicializar o progresso
        updateProgress(0);
        
        wordInput.value = '';
        wordInput.disabled = false;
        wordInput.focus();
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        isPlaying = true;
        isPaused = false;
        
        showWord();
        startTimer();
    }

    // Atualizar a barra de progresso
    function updateProgress(wordCount) {
        const percentage = (wordCount % wordsPerLevel) / wordsPerLevel * 100;
        progressBar.style.width = `${percentage}%`;
        wordsCount.textContent = wordCount % wordsPerLevel;
        wordsTarget.textContent = wordsPerLevel;
    }

    // Mostrar uma palavra aleatória
    function showWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length);
        // Use the word as-is without changing capitalization
        currentWord = palavras[randomIndex];
        
        // Mostrar a palavra com letras individuais em spans para colorir depois
        wordDisplay.innerHTML = '';
        for (let i = 0; i < currentWord.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = currentWord[i];
            letterSpan.className = 'letter';
            wordDisplay.appendChild(letterSpan);
        }
    }

    // Iniciar o temporizador
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
                
                if (timeLeft === 0) {
                    gameOver();
                }
            }
        }, 1000);
    }

    // Fim de jogo
    function gameOver() {
        isPlaying = false;
        clearInterval(timer);
        wordDisplay.textContent = 'Fim de Jogo!';
        wordInput.disabled = true;
        startBtn.textContent = 'Reiniciar';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        salvarProgresso()
    }
    
    //Desistir do jogo
    desistirBtn.addEventListener("click", () => {
        console.log("Ola")
    })
    
    
    // Verificar a palavra digitada
    function checkMatch() {
        const typedValue = wordInput.value; // Remove toLowerCase() to make it case-sensitive
        
        // Colorir as letras conforme digitação
        const letters = wordDisplay.querySelectorAll('.letter');
        
        for (let i = 0; i < letters.length; i++) {
            if (i < typedValue.length) {
                // Verificar se a letra digitada corresponde à letra da palavra (case-sensitive)
                if (typedValue[i] === currentWord[i]) {
                    letters[i].className = 'letter correct';
                } else {
                    letters[i].className = 'letter incorrect';
                }
            } else {
                letters[i].className = 'letter';
            }
        }
        
        // Verificar se a palavra está completa e correta (case-sensitive)
        if (typedValue === currentWord) {
            wordInput.value = '';
            score++;
            scoreDisplay.textContent = score;
            
            // Atualizar o progresso
            updateProgress(score);
            
            // Verificar se deve avançar de nível
            if (score % wordsPerLevel === 0) {
                levelUp();
            } else {
                showWord();
            }
        }
    }

    // Avançar de nível
    function levelUp() {
        level++;
        levelDisplay.textContent = level;
        
        // Reduzir o tempo máximo (até o mínimo de 45s)
        maxTime = Math.max(minTime, maxTime - 5);
        
        // Reiniciar o tempo para o novo máximo
        timeLeft = maxTime;
        timeDisplay.textContent = timeLeft;
        
        wordDisplay.innerHTML = `<span class="level-up">Nível ${level}!</span>`;
        
        // Pequena pausa antes de mostrar a próxima palavra
        setTimeout(() => {
            showWord();
        }, 1000);
    }

    // Pausar/Continuar o jogo
    function togglePause() {
        isPaused = !isPaused;
        
        if (isPaused) {
            pauseBtn.textContent = 'Continuar';
            wordDisplay.innerHTML = '<span class="paused">JOGO PAUSADO</span>';
            wordInput.disabled = true;
        } else {
            pauseBtn.textContent = 'Pausar';
            showWord();
            wordInput.disabled = false;
            wordInput.focus();
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', init);
    
    pauseBtn.addEventListener('click', togglePause);
    
    wordInput.addEventListener('input', () => {
        if (isPlaying && !isPaused) {
            checkMatch();
        }
    });
    


    async function salvarProgresso() {
        const db = window.firebaseDb;
        const { doc, setDoc, getDoc } = window.firebaseTools;

        const { value: formValues } = await Swal.fire({
            title: "Salve seu progresso",
            html:
                '<input id="swal-nome" class="swal2-input" placeholder="Digite seu nome completo">' +
                '<input id="swal-codigo" class="swal2-input" placeholder="Digite seu código do curso">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            preConfirm: () => {
                const nome = document.getElementById("swal-nome").value.trim();
                const codigo = document.getElementById("swal-codigo").value.trim();
                if (!nome || !codigo) {
                    Swal.showValidationMessage("Preencha todos os campos");
                    return false;
                }
                return { nome, codigo };
            }
        });

        if (!formValues) return; // Cancelado

        const { nome, codigo } = formValues;

        const ref = doc(db, "jogadores", codigo);
        const snapshot = await getDoc(ref);

        const dadosParaSalvar = {
            score: score,   // usa os valores globais atuais
            level: level
        };

        if (!snapshot.exists()) {
            dadosParaSalvar.nome = nome;
        }

        await setDoc(ref, dadosParaSalvar, { merge: true });

        Swal.fire("Sucesso", "Progresso salvo!", "success");
        console.log("Progresso salvo!");
    }

    function setFavicon(url) {
        let link = document.querySelector("link[rel~='icon']");
        
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }

        link.href = url;
    }


setFavicon("/assets/img/skillpoint.png");

document.title = "SkillPoint"


});