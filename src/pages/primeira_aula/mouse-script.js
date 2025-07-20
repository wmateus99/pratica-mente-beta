document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const gameDisplay = document.getElementById('game-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreElement = document.getElementById('score');
    const currentLevelElement = document.getElementById('current-level');
    const levelButtons = document.querySelectorAll('.level-btn');
    
    // Game variables
    let isPlaying = false;
    let score = 0;
    let currentLevel = 'level1';
    let targetsClicked = 0;
    let totalTargets = 25;
    let completedLevels = [];
    let timeLeft = 50; // Add timer variable
    let timerInterval; // Add timer interval variable
    
    // Initialize the game
    function init() {
        // Event listeners
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        
        // Level selection
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentLevel = button.getAttribute('data-level');
                currentLevelElement.textContent = currentLevel.replace('level', '');
                resetGame();
            });
        });
    }
    
    // Start the game
    function startGame() {
        isPlaying = true;
        startBtn.disabled = true;
        resetBtn.disabled = false;
        
        // Reset stats
        score = 0;
        targetsClicked = 0;
        timeLeft = 50; // Reset timer
        
        // Update display
        scoreElement.textContent = score;
        
        // Clear game display
        gameDisplay.innerHTML = '';
        
        // Start level based on selection
        switch(currentLevel) {
            case 'level1':
                startClickLevel();
                startTimer(); // Start the timer for level 1
                break;
            case 'level2':
                totalTargets = 10; // Set 10 items for drag and drop level
                startDragLevel();
                break;
            case 'level3':
                totalTargets = 25; // Reset to default for other levels
                startDoubleClickLevel();
                break;
            case 'level4':
                totalTargets = 25;
                startPrecisionLevel();
                break;
        }
    }
    
    // Add timer function
    function startTimer() {
        // Create timer display if it doesn't exist
        if (!document.getElementById('timer-display')) {
            const timerDisplay = document.createElement('div');
            timerDisplay.id = 'timer-display';
            timerDisplay.style.position = 'absolute';
            timerDisplay.style.top = '10px';
            timerDisplay.style.right = '10px';
            timerDisplay.style.padding = '5px 10px';
            timerDisplay.style.backgroundColor = '#0ab4b45e';
            timerDisplay.style.color = 'white';
            timerDisplay.style.borderRadius = '4px';
            timerDisplay.style.fontWeight = 'bold';
            gameDisplay.appendChild(timerDisplay);
        }
        
        // Update timer display
        document.getElementById('timer-display').textContent = `Tempo: ${timeLeft}s`;
        
        // Clear any existing interval
        if (timerInterval) clearInterval(timerInterval);
        
        // Start the countdown
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-display').textContent = `Tempo: ${timeLeft}s`;
            
            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                
                // Check if goal was reached
                if (score >= 250) {
                    completeLevel();
                } else {
                    gameDisplay.innerHTML = `
                        <h3>Tempo Esgotado!</h3>
                        <p>Sua pontuação: ${score}</p>
                        <p>Meta: 250 pontos</p>
                        <p>Tente novamente para alcançar a meta!</p>
                    `;
                    isPlaying = false;
                    startBtn.disabled = false;
                }
            }
        }, 1000);
    }
    
    // Level 1: Simple clicking
    function startClickLevel() {
        createTarget();
    }
    
    function createTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Random size between 30 and 60px
        const size = Math.floor(Math.random() * 31) + 30;
        // target.style.width = `${size}px`;
        // target.style.height = `${size}px`;
        
        // Random position within game display
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        target.textContent = targetsClicked + 1;
        
        target.addEventListener('click', () => {
            target.remove();
            targetsClicked++;
            score += 10;
            scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createTarget, 500);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // Level 2: Drag and drop
    function startDragLevel() {
        gameDisplay.innerHTML = '<div class="drag-instruction">Arraste os quadrados azuis para as áreas tracejadas!</div>';
        
        // Adjust spacing for 10 items
        for (let i = 0; i < 10; i++) {
            createDraggableItem(i);
        }
    }
    
    function createDraggableItem(index) {
        // Create drop zone
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.index = index;
        
        const size = 60;
        dropZone.style.width = `${size + 10}px`;
        dropZone.style.height = `${size + 10}px`;
        
        // Position drop zones in a row or grid depending on count
        if (totalTargets <= 5) {
            // For few items, position in a row
            const spacing = gameDisplay.clientWidth / (totalTargets + 1);
            dropZone.style.left = `${spacing * (index + 1) - size/2}px`;
            dropZone.style.bottom = '30px';
        } else {
            // For more items, position in a grid (2 rows)
            const itemsPerRow = Math.ceil(totalTargets / 2);
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            
            const spacingX = gameDisplay.clientWidth / (itemsPerRow + 1);
            dropZone.style.left = `${spacingX * (col + 1) - size/2}px`;
            dropZone.style.bottom = row === 0 ? '100px' : '30px';
        }
        
        dropZone.textContent = index + 1;
        
        // Create draggable item
        const draggable = document.createElement('div');
        draggable.className = 'draggable';
        draggable.dataset.index = index;
        
        draggable.style.width = `${size}px`;
        draggable.style.height = `${size}px`;
        
        // Random position at the top
        const maxX = gameDisplay.clientWidth - size;
        draggable.style.left = `${Math.floor(Math.random() * maxX)}px`;
        draggable.style.top = '30px';
        
        draggable.textContent = index + 1;
        
        // Make element draggable
        draggable.draggable = true;
        
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', draggable.dataset.index);
        });
        
        // Add drop event listeners to drop zone
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');
            
            if (draggedIndex === dropZone.dataset.index) {
                const draggedElement = document.querySelector(`.draggable[data-index="${draggedIndex}"]`);
                draggedElement.remove();
                
                dropZone.style.border = '2px solid #2ecc71';
                dropZone.style.backgroundColor = '#2ecc71';
                dropZone.style.color = 'white';
                
                targetsClicked++;
                score += 15;
                scoreElement.textContent = score;
                
                if (targetsClicked >= totalTargets) {
                    completeLevel();
                }
            }
        });
        
        gameDisplay.appendChild(dropZone);
        gameDisplay.appendChild(draggable);
    }
    
    // Level 3: Double clicking
    function startDoubleClickLevel() {
        gameDisplay.innerHTML = '<div class="double-click-instruction">Dê um duplo clique nos círculos vermelhos!</div>';
        createDoubleClickTarget();
    }
    
    function createDoubleClickTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Random size between 40 and 70px
        const size = Math.floor(Math.random() * 31) + 40;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Random position within game display
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        target.textContent = targetsClicked + 1;
        
        target.addEventListener('dblclick', () => {
            target.remove();
            targetsClicked++;
            score += 20;
            scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createDoubleClickTarget, 500);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // Level 5: Precision clicking
    function startPrecisionLevel() {
        gameDisplay.innerHTML = '<div class="precision-instruction">Clique nos círculos pequenos rapidamente!</div>';
        createPrecisionTarget();
    }
    
    function createPrecisionTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Small size between 15 and 30px
        const size = Math.floor(Math.random() * 16) + 15;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Random position within game display
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        // Make it disappear after 2 seconds
        const disappearTimeout = setTimeout(() => {
            if (target.parentNode) {
                target.remove();
                createPrecisionTarget();
            }
        }, 2000);
        
        target.addEventListener('click', () => {
            clearTimeout(disappearTimeout);
            target.remove();
            targetsClicked++;
            score += 30;
            scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createPrecisionTarget, 300);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // Complete level
    function completeLevel() {
        // Clear timer if it's running
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        if (!completedLevels.includes(currentLevel)) {
            completedLevels.push(currentLevel);
        }
        
        gameDisplay.innerHTML = `
            <h3>Nível ${currentLevel.replace('level', '')} Concluído!</h3>
            <p>Pontuação: ${score}</p>
            <p>Clique em "Iniciar" para tentar novamente ou selecione outro nível.</p>
        `;
        
        // Check if all levels are completed
        if (completedLevels.length === 5) {
            showCongratulations();
        } else {
            isPlaying = false;
            startBtn.disabled = false;
        }
    }
    
    // Show congratulations message
    function showCongratulations() {
        isPlaying = false;
        startBtn.disabled = false;
        
        gameDisplay.innerHTML = `
            <h3>Parabéns! Você completou todos os níveis!</h3>
            <p>Você dominou todas as habilidades básicas do mouse.</p>
            <p>Pontuação final: ${score}</p>
            <p>Clique em "Iniciar" para praticar novamente desde o início.</p>
        `;
        
        // Reset completion tracking for a new game
        completedLevels = [];
    }
    
    // Reset the game
    function resetGame() {
        // Clear timer if it's running
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        isPlaying = false;
        startBtn.disabled = false;
        resetBtn.disabled = true;
        
        // Reset stats
        score = 0;
        targetsClicked = 0;
        scoreElement.textContent = score;
        
        // Reset display
        gameDisplay.innerHTML = 'Clique em "Iniciar" para começar a praticar!';
    }
    
    // Initialize the game
    init();
});