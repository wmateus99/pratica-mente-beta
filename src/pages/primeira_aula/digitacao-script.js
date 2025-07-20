document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreElement = document.getElementById('score');
    const accuracyElement = document.getElementById('accuracy');
    const levelButtons = document.querySelectorAll('.level-btn');
    const keys = document.querySelectorAll('.key');
    
    // Game variables
    let isPlaying = false;
    let score = 0;
    let correctChars = 0;
    let totalChars = 0;
    let currentTextIndex = 0;
    let currentLevel = 'level1';
    let completedPhrases = {
        level1: [],
        level2: [],
        level3: [],
        level4: [],
        level5: []
    };
    
    // Text samples by learning level
    const textSamples = {
        level1: [
            "asdf jklç asdf jklç asdf jklç",
            "qwer uiop qwer uiop qwer uiop",
            "çlkj fdsa çlkj fdsa çlkj fdsa",
            "asjk dflç asjk dflç asjk dflç",
            "tttt ssss iiii"
        ],
        level2: [
            "á é í ó ú",
            "O café está quente",
            "Não há água na geladeira",
            "Você está aprendendo rápido",
            "É importante praticar todos os dias"
        ],
        level3: [
            "â ê î ô û",
            "Você está com o chapéu",
            "Nós vamos ao Amazonas",
            "O pôr do sol está lindo",
            "Eles têm muitos amigos"
        ],
        level4: [
            "computador teclado mouse monitor",
            "internet navegador programa arquivo",
            "documento pasta imprimir salvar",
            "tecnologia informação digital virtual",
            "aprendizado conhecimento habilidade prática"
        ],
        level5: [
            "@ # $ % & * ( )",
            "email@exemplo.com.br",
            "Senha: Abc123!@#",
            "²² ªª ¹¹",
            "Telefone: (11) 98765-4321"
        ]
    };
    
    // Initialize the game
    function init() {
        // Event listeners
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        textInput.addEventListener('input', checkInput);
        
        // Level selection
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentLevel = button.getAttribute('data-level');
                resetGame();
            });
        });
        
        // Virtual keyboard
        keys.forEach(key => {
            key.addEventListener('click', () => {
                if (isPlaying) {
                    const keyValue = key.getAttribute('data-key');
                    textInput.value += keyValue;
                    textInput.focus();
                    checkInput();
                }
            });
        });
        
        // Keyboard events for highlighting virtual keys
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.add('active');
            }
        });
        
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.remove('active');
            }
        });
    }
    
    // Start the game
    function startGame() {
        isPlaying = true;
        textInput.disabled = false;
        startBtn.disabled = true;
        resetBtn.disabled = false;
        
        // Reset stats
        score = 0;
        correctChars = 0;
        totalChars = 0;
        
        // Update display
        scoreElement.textContent = score;
        accuracyElement.textContent = '0';
        
        // Get random text that hasn't been completed yet
        const availableTexts = textSamples[currentLevel].filter((text, index) => 
            !completedPhrases[currentLevel].includes(index)
        );
        
        // If all texts in this level are completed, move to next level
        if (availableTexts.length === 0) {
            moveToNextLevel();
            return;
        }
        
        // Get a random text from available texts
        const randomIndex = Math.floor(Math.random() * availableTexts.length);
        const text = availableTexts[randomIndex];
        const actualIndex = textSamples[currentLevel].indexOf(text);
        
        // Format text for display
        displayText(text);
        
        // Store the current text index for tracking completion
        currentTextIndex = actualIndex;
        
        // Focus on input
        textInput.value = '';
        textInput.focus();
    }
    
    // Move to the next level
    function moveToNextLevel() {
        const levels = ['level1', 'level2', 'level3', 'level4', 'level5'];
        const currentLevelIndex = levels.indexOf(currentLevel);
        
        // If this is the last level and all phrases are completed
        if (currentLevelIndex === levels.length - 1) {
            showCongratulations();
            return;
        }
        
        // Move to next level
        const nextLevel = levels[currentLevelIndex + 1];
        currentLevel = nextLevel;
        
        // Update UI to show current level
        levelButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-level') === currentLevel) {
                btn.classList.add('active');
            }
        });
        
        // Start the game with the new level
        startGame();
    }
    
    // Show congratulations message
    function showCongratulations() {
        isPlaying = false;
        textInput.disabled = true;
        startBtn.disabled = false;
        
        textDisplay.innerHTML = `
            <h3>Parabéns! Você completou todos os níveis!</h3>
            <p>Você dominou todas as habilidades de digitação básicas.</p>
            <p>Pontuação final: ${score}</p>
            <p>Clique em "Iniciar" para praticar novamente desde o início.</p>
        `;
        
        // Reset completion tracking for a new game
        completedPhrases = {
            level1: [],
            level2: [],
            level3: [],
            level4: [],
            level5: []
        };
        
        // Reset to first level
        currentLevel = 'level1';
        levelButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-level') === currentLevel) {
                btn.classList.add('active');
            }
        });
    }
    
    // Display text with formatting
    function displayText(text) {
        textDisplay.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text[i];
            
            if (i === 0) {
                charSpan.classList.add('current');
            }
            
            textDisplay.appendChild(charSpan);
        }
        
        currentTextIndex = 0;
    }
    
    // Check user input
    function checkInput() {
        const text = textDisplay.textContent;
        const userInput = textInput.value;
        const spans = textDisplay.querySelectorAll('span');
        
        // Update character tracking
        totalChars = userInput.length;
        correctChars = 0;
        
        // Reset all character states first
        spans.forEach(span => {
            span.className = '';
        });
        
        // Remove all current markers
        spans.forEach(span => span.classList.remove('current'));
        
        for (let i = 0; i < userInput.length; i++) {
            if (i < text.length) {
                if (userInput[i] === text[i]) {
                    spans[i].className = 'correct';
                    correctChars++;
                } else {
                    spans[i].className = 'incorrect';
                }
            }
        }
        
        // Add current marker to next character
        if (userInput.length < text.length) {
            spans[userInput.length].classList.add('current');
        }
        
        // Calculate accuracy
        const accuracy = totalChars > 0 ? Math.floor((correctChars / totalChars) * 100) : 0;
        accuracyElement.textContent = accuracy;
        
        // Check if text is completed correctly
        if (userInput === text) {
            // Calculate score based on text length, accuracy and difficulty
            const levelMultiplier = {
                'level1': 1,
                'level2': 1.2,
                'level3': 1.5,
                'level4': 1.8,
                'level5': 2
            };
            
            const newPoints = Math.floor(text.length * (accuracy / 100) * levelMultiplier[currentLevel]);
            score += newPoints;
            scoreElement.textContent = score;
            
            // Mark this phrase as completed
            if (!completedPhrases[currentLevel].includes(currentTextIndex)) {
                completedPhrases[currentLevel].push(currentTextIndex);
            }
            
            // Check if all phrases in this level are completed
            if (completedPhrases[currentLevel].length === textSamples[currentLevel].length) {
                // Show level completion message and move to next level
                textDisplay.innerHTML = `
                    <h3>Nível ${currentLevel.replace('level', '')} Concluído!</h3>
                    <p>Preparando próximo nível...</p>
                `;
                
                setTimeout(() => {
                    moveToNextLevel();
                }, 2000);
                return;
            }
            
            // Get a new text that hasn't been completed yet
            const availableTexts = textSamples[currentLevel].filter((text, index) => 
                !completedPhrases[currentLevel].includes(index)
            );
            
            const randomIndex = Math.floor(Math.random() * availableTexts.length);
            const newText = availableTexts[randomIndex];
            const actualIndex = textSamples[currentLevel].indexOf(newText);
            
            // Reset input and display new text
            textInput.value = '';
            displayText(newText);
            
            // Update current text index
            currentTextIndex = actualIndex;
        }
    }
    
    // End the game
    function endGame() {
        isPlaying = false;
        textInput.disabled = true;
        startBtn.disabled = false;
        
        // Show final results
        textDisplay.innerHTML = `
            <h3>Fim do exercício!</h3>
            <p>Pontuação final: ${score}</p>
            <p>Precisão: ${accuracyElement.textContent}%</p>
            <p>Clique em "Iniciar" para praticar novamente.</p>
        `;
    }
    
    // Reset the game
    function resetGame() {
        isPlaying = false;
        textInput.disabled = true;
        startBtn.disabled = false;
        resetBtn.disabled = true;
        
        // Reset stats
        score = 0;
        scoreElement.textContent = score;
        accuracyElement.textContent = '0';
        
        // Reset completion tracking
        completedPhrases = {
            level1: [],
            level2: [],
            level3: [],
            level4: [],
            level5: []
        };
        
        // Reset display
        textDisplay.innerHTML = 'Clique em "Iniciar" para começar a digitar!';
        textInput.value = '';
    }
    
    // Initialize the game
    init();
});