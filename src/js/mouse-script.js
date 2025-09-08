// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    // ==============================
    // ELEMENTOS DO DOM
    // ==============================
    const gameDisplay = document.getElementById('game-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreElement = document.getElementById('score');
    const currentLevelElement = document.getElementById('current-level');
    const levelButtons = document.querySelectorAll('.level-btn');
    
    // ==============================
    // VARIÁVEIS DO JOGO
    // ==============================
    let isPlaying = false;        // Indica se o jogo está em andamento
    let score = 0;                // Pontuação do jogador
    let currentLevel = 'level1';  // Nível atual selecionado
    let targetsClicked = 0;       // Quantidade de alvos clicados
    let totalTargets = 25;        // Total de alvos por nível
    let completedLevels = [];     // Lista de níveis concluídos
    let timeLeft = 50;            // Tempo restante (apenas usado no nível com timer)
    let timerInterval;            // Intervalo do temporizador
    
    // ==============================
    // FUNÇÃO DE INICIALIZAÇÃO
    // ==============================
    function init() {
        // Botões principais
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        
        // Botões de seleção de nível
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Atualiza visualmente o botão ativo
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Define o nível selecionado
                currentLevel = button.getAttribute('data-level');
                // currentLevelElement.textContent = currentLevel.replace('level', '');

                // Reinicia o jogo ao mudar de nível
                resetGame();
            });
        });
    }
    
    // ==============================
    // INICIAR JOGO
    // ==============================
    function startGame() {
        isPlaying = true;
        startBtn.disabled = true;
        resetBtn.disabled = false;

        // Reinicia estatísticas
        score = 0;
        targetsClicked = 0;
        timeLeft = 50; // Reset do timer

        // Atualiza exibição inicial
        // scoreElement.textContent = score;
        gameDisplay.innerHTML = '';

        // Inicia o nível correspondente
        switch(currentLevel) {
            case 'level1':
                startClickLevel();
                startTimer(); // Timer apenas no nível 1
                break;
            case 'level2':
                totalTargets = 10;
                startDragLevel();
                break;
            case 'level3':
                totalTargets = 25;
                startDoubleClickLevel();
                break;
            case 'level4':
                totalTargets = 25;
                startPrecisionLevel();
                break;
        }
    }
    
    // ==============================
    // TIMER (usado no nível 1)
    // ==============================
    function startTimer() {
        // Cria o display do timer se não existir
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
        
        // Atualiza o display
        document.getElementById('timer-display').textContent = `Tempo: ${timeLeft}s`;
        
        // Limpa intervalos anteriores
        if (timerInterval) clearInterval(timerInterval);
        
        // Inicia contagem regressiva
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-display').textContent = `Tempo: ${timeLeft}s`;
            
            // Fim do tempo
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                
                if (score >= 250) {
                    completeLevel();
                } else {
                    gameDisplay.innerHTML = `
                        <h3>Tempo Esgotado!</h3>
                        <p>Sua pontuação: ${score}</p>
                        <p>Meta: 250 pontos</p>
                        <p>Tente novamente!</p>
                    `;
                    isPlaying = false;
                    startBtn.disabled = false;
                }
            }
        }, 1000);
    }
    
    // ==============================
    // NÍVEL 1: CLIQUES SIMPLES
    // ==============================
    function startClickLevel() {
        createTarget();
    }
    
    function createTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Tamanho aleatório entre 30 e 60px
        const size = Math.floor(Math.random() * 31) + 30;
        
        // Posição aleatória
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        target.textContent = targetsClicked + 1;
        
        // Evento de clique
        target.addEventListener('click', () => {
            target.remove();
            targetsClicked++;
            score += 10;
            // scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createTarget, 500);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // ==============================
    // NÍVEL 2: ARRASTAR E SOLTAR
    // ==============================
    function startDragLevel() {
        gameDisplay.innerHTML = '<div class="drag-instruction"></div>';
        
        for (let i = 0; i < 10; i++) {
            createDraggableItem(i);
        }
    }
    
    function createDraggableItem(index) {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.index = index;
        
        const size = 60;
        dropZone.style.width = `${size + 10}px`;
        dropZone.style.height = `${size + 10}px`;
        
        // Posicionamento em linha ou grade
        if (totalTargets <= 5) {
            const spacing = gameDisplay.clientWidth / (totalTargets + 1);
            dropZone.style.left = `${spacing * (index + 1) - size/2}px`;
            dropZone.style.bottom = '30px';
        } else {
            const itemsPerRow = Math.ceil(totalTargets / 2);
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            const spacingX = gameDisplay.clientWidth / (itemsPerRow + 1);
            dropZone.style.left = `${spacingX * (col + 1) - size/2}px`;
            dropZone.style.bottom = row === 0 ? '100px' : '30px';
        }
        
        dropZone.textContent = index + 1;
        
        // Elemento arrastável
        const draggable = document.createElement('div');
        draggable.className = 'draggable';
        draggable.dataset.index = index;
        draggable.style.width = `${size}px`;
        draggable.style.height = `${size}px`;
        
        // Posição inicial aleatória
        const maxX = gameDisplay.clientWidth - size;
        draggable.style.left = `${Math.floor(Math.random() * maxX)}px`;
        draggable.style.top = '30px';
        draggable.textContent = index + 1;
        draggable.draggable = true;
        
        // Eventos de arrastar
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', draggable.dataset.index);
        });
        
        dropZone.addEventListener('dragover', (e) => e.preventDefault());
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');
            
            if (draggedIndex === dropZone.dataset.index) {
                const draggedElement = document.querySelector(`.draggable[data-index="${draggedIndex}"]`);
                draggedElement.remove();
                
                // Marca zona como correta
                dropZone.style.border = '2px solid #2ecc71';
                dropZone.style.backgroundColor = '#2ecc71';
                dropZone.style.color = 'white';
                
                targetsClicked++;
                score += 15;
                // scoreElement.textContent = score;
                
                if (targetsClicked >= totalTargets) {
                    completeLevel();
                }
            }
        });
        
        gameDisplay.appendChild(dropZone);
        gameDisplay.appendChild(draggable);
    }
    
    // ==============================
    // NÍVEL 3: CLIQUES DUPLOS
    // ==============================
    function startDoubleClickLevel() {
        gameDisplay.innerHTML = '<div class="double-click-instruction"></div>';
        createDoubleClickTarget();
    }
    
    function createDoubleClickTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Tamanho entre 40 e 70px
        const size = Math.floor(Math.random() * 31) + 40;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Posição aleatória
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        target.textContent = targetsClicked + 1;
        
        // Evento de duplo clique
        target.addEventListener('dblclick', () => {
            target.remove();
            targetsClicked++;
            score += 20;
            // scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createDoubleClickTarget, 500);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // ==============================
    // NÍVEL 4: PRECISÃO (ALVOS PEQUENOS)
    // ==============================
    function startPrecisionLevel() {
        gameDisplay.innerHTML = '<div class="precision-instruction"></div>';
        createPrecisionTarget();
    }
    
    function createPrecisionTarget() {
        if (!isPlaying) return;
        
        const target = document.createElement('div');
        target.className = 'target';
        
        // Tamanho entre 15 e 30px
        const size = Math.floor(Math.random() * 16) + 15;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Posição aleatória
        const maxX = gameDisplay.clientWidth - size;
        const maxY = gameDisplay.clientHeight - size;
        const posX = Math.floor(Math.random() * maxX);
        const posY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${posX}px`;
        target.style.top = `${posY}px`;
        
        // Alvo desaparece após 2s se não for clicado
        const disappearTimeout = setTimeout(() => {
            if (target.parentNode) {
                target.remove();
                createPrecisionTarget();
            }
        }, 2000);
        
        // Clique no alvo
        target.addEventListener('click', () => {
            clearTimeout(disappearTimeout);
            target.remove();
            targetsClicked++;
            score += 30;
            // scoreElement.textContent = score;
            
            if (targetsClicked < totalTargets) {
                setTimeout(createPrecisionTarget, 300);
            } else {
                completeLevel();
            }
        });
        
        gameDisplay.appendChild(target);
    }
    
    // ==============================
    // CONCLUSÃO DE NÍVEL
    // ==============================
    function completeLevel() {
        if (timerInterval) clearInterval(timerInterval);
        
        if (!completedLevels.includes(currentLevel)) {
            completedLevels.push(currentLevel);
        }
        
        gameDisplay.innerHTML = `
            <h3>Nível ${currentLevel.replace('level', '')} Concluído!</h3>
            <p>Pontuação: ${score}</p>
            <p>Clique em "Iniciar" para tentar novamente ou selecione outro nível.</p>
        `;
        
        if (completedLevels.length === 5) {
            showCongratulations();
        } else {
            isPlaying = false;
            startBtn.disabled = false;
        }
    }
    
    // ==============================
    // MENSAGEM FINAL
    // ==============================
    function showCongratulations() {
        isPlaying = false;
        startBtn.disabled = false;
        
        gameDisplay.innerHTML = `
            <h3>Parabéns! Você completou todos os níveis!</h3>
            <p>Você dominou todas as habilidades básicas do mouse.</p>
            <p>Pontuação final: ${score}</p>
            <p>Clique em "Iniciar" para praticar novamente.</p>
        `;
        
        completedLevels = []; // Reseta progresso
    }
    
    // ==============================
    // REINICIAR JOGO
    // ==============================
    function resetGame() {
        if (timerInterval) clearInterval(timerInterval);
        
        isPlaying = false;
        startBtn.disabled = false;
        resetBtn.disabled = true;
        
        score = 0;
        targetsClicked = 0;
        // scoreElement.textContent = score;
        
        gameDisplay.innerHTML = '';
    }
    
    // ==============================
    // EXECUTA INICIALIZAÇÃO
    // ==============================
    init();
});