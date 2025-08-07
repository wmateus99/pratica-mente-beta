const gabarito = {
    1: "A",
    2: "C"
};

const dataAnalise = {

}

document.querySelectorAll('.card-question').forEach((card) => {
    const alternatives = card.querySelectorAll('.alternative');
        
    alternatives.forEach((alt) => {
        alt.addEventListener('click', () => {
            alternatives.forEach((a) => a.classList.remove('alternative-active'));

            alt.classList.add('alternative-active');

            const questionId = card.dataset.questionId;
            const selectedAlt = alt.dataset.alternative;

            if (gabarito[questionId] === selectedAlt) {
                dataAnalise[questionId] = 10
                
            } else {
                dataAnalise[questionId] = 0
            }
            console.log(dataAnalise)
            const soma = Object.values(dataAnalise).reduce((acc, val) => acc + val, 0);
            console.log(soma);
            console.log(soma  / 100)

        });
    });
});