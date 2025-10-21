const atividades = {
    introducaoInformatica: 1,
    windows: 8,
    internet: 2,
    word: 5,
    excel: 4,
    excelAvancado: 5,
    powerpoint: 0,
    photoshop: 0,
    coreldraw: 0,
    outros: 1
};

Object.keys(atividades).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = atividades[id];
    }
});
