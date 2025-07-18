document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename to use as part of the storage key
    const currentPage = window.location.pathname.split('/').pop();
    const storageKey = 'studentText_' + currentPage;
    
    const textArea = document.getElementById('student-input');
    const saveButton = document.getElementById('save-text');
    const exportButton = document.getElementById('export-text');
    const importButton = document.getElementById('import-text');
    const fileInput = document.getElementById('file-input');
    
    // Load saved text from localStorage if available for this specific page
    const savedText = localStorage.getItem(storageKey);
    if (savedText) {
        textArea.value = savedText;
        updateCounts(savedText);
    }
    
    // Prevent paste and drag-drop operations
    textArea.addEventListener('paste', function(e) {
        e.preventDefault();
        showCenteredNotification('Não é permitido colar texto. Por favor, digite manualmente para praticar.');
    });
    
    textArea.addEventListener('drop', function(e) {
        e.preventDefault();
        showCenteredNotification('Não é permitido arrastar e soltar texto. Por favor, digite manualmente para praticar.');
    });
    
    // Prevent drag operations
    textArea.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    textArea.addEventListener('dragenter', function(e) {
        e.preventDefault();
    });
    
    // Update word and character counts
    // Update auto-save to use the page-specific storage key
    textArea.addEventListener('input', function() {
        const text = this.value;
        updateCounts(text);
        
        // Auto-save as user types (with debounce)
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function() {
            localStorage.setItem(storageKey, text);
        }, 1000);
    });
    
    // Save button functionality with page-specific storage key
    saveButton.addEventListener('click', function() {
        const text = textArea.value;
        localStorage.setItem(storageKey, text);
        
        // Show confirmation
        showNotification('Texto salvo com sucesso!');
    });
    
    // Export button functionality
    exportButton.addEventListener('click', function() {
        const text = textArea.value;
        if (!text.trim()) {
            showCenteredNotification('Não há texto para exportar.');
            return;
        }
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meu_texto.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    // Import button functionality
    importButton.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result + "wmss: imported text";
            textArea.value = content;
            localStorage.setItem('studentText', content);
            updateCounts(content);
        };
        reader.readAsText(file);
    });
    
    function updateCounts(text) {
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const charCount = text.length;
        
        document.getElementById('word-count').textContent = wordCount + ' palavras';
        document.getElementById('char-count').textContent = charCount + ' caracteres';
    }
    
    // Helper function for notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'black';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }
    
    // Function for centered modal notifications (replacing alerts)
    function showCenteredNotification(message, isConfirm = false) {
        return new Promise((resolve) => {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '2000';
            
            // Create notification box
            const notificationBox = document.createElement('div');
            notificationBox.style.backgroundColor = 'var(--dark-surface)';
            notificationBox.style.color = 'var(--text-color)';
            notificationBox.style.padding = '25px';
            notificationBox.style.borderRadius = '8px';
            notificationBox.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
            notificationBox.style.maxWidth = '400px';
            notificationBox.style.textAlign = 'center';
            notificationBox.style.border = '2px solid var(--primary-color)';
            
            // Message
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageElement.style.fontSize = '16px';
            messageElement.style.marginBottom = '20px';
            
            // Buttons container
            const buttonsContainer = document.createElement('div');
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.justifyContent = isConfirm ? 'space-between' : 'center';
            buttonsContainer.style.gap = '10px';
            
            // OK button
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.style.padding = '8px 20px';
            okButton.style.backgroundColor = 'var(--primary-color)';
            okButton.style.color = 'black';
            okButton.style.border = 'none';
            okButton.style.borderRadius = '4px';
            okButton.style.cursor = 'pointer';
            okButton.style.fontWeight = 'bold';
            okButton.style.minWidth = '80px';
            
            okButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
                resolve(true);
            });
            
            buttonsContainer.appendChild(okButton);
            
            // Cancel button (for confirm dialogs)
            if (isConfirm) {
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancelar';
                cancelButton.style.padding = '8px 20px';
                cancelButton.style.backgroundColor = 'transparent';
                cancelButton.style.color = 'var(--text-color)';
                cancelButton.style.border = '1px solid var(--text-color)';
                cancelButton.style.borderRadius = '4px';
                cancelButton.style.cursor = 'pointer';
                cancelButton.style.minWidth = '80px';
                
                cancelButton.addEventListener('click', () => {
                    document.body.removeChild(overlay);
                    resolve(false);
                });
                
                buttonsContainer.appendChild(cancelButton);
            }
            
            // Assemble notification
            notificationBox.appendChild(messageElement);
            notificationBox.appendChild(buttonsContainer);
            overlay.appendChild(notificationBox);
            document.body.appendChild(overlay);
            
            // Focus the OK button
            okButton.focus();
        });
    }
});