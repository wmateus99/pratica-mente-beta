// loader.js

(function () {
    // CSS do loader
    const style = document.createElement('style');
    style.innerHTML = `
        #loading-screen {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100vh;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin .5s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // HTML do loader
    const loader = document.createElement('div');
    loader.id = 'loading-screen';
    loader.innerHTML = `<div class="loader"></div>`;
    document.body.appendChild(loader);

    // Remove loader ao carregar tudo
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.remove();
        }, 500); // atraso opcional
    });
})();
