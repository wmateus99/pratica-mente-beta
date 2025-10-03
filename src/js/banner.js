export function banner() {
    const target = new Date(2025, 11, 20, 0, 0, 0); // 20 Dez 2025 00:00:00 local

    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    function pad(n){return String(n).padStart(2,'0')}

    function updateCountdown(){
        const now = new Date();
        let diff = Math.max(0, target - now);

        if(diff === 0){
            elDays.textContent = '0';
            elHours.textContent = '00';
            elMinutes.textContent = '00';
            elSeconds.textContent = '00';
            clearInterval(timer);
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (24*3600));
        const hours = Math.floor((totalSeconds % (24*3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        elDays.textContent = days;
        elHours.textContent = pad(hours);
        elMinutes.textContent = pad(minutes);
        elSeconds.textContent = pad(seconds);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}