import { criarCard } from './cards.js';

export const cardsProntos = [
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Primeira Aula',
            descricao: 'Todo grande começo começa com o primeiro passo. Aproveite sua primeira aula!',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Jogo de Digitação',
            descricao: 'Desafie seus dedos e turbine sua velocidade no jogo de digitação!',
            imagem: '/public/img/cards/game-digitacao.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Plataforma TsiFLix',
            descricao: 'Conhecimento na tela, no seu tempo: explore tudo o que a TSIFLIX oferece!',
            imagem: '/public/img/cards/Tsi.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "qrtsi",
            titulo: 'Avalie a Escola Tsi',
            descricao: 'Sua opinião transforma! Avalie a Escola TSI e nos ajude a evoluir.',
            imagem: '/public/img/cards/qr-tsi.svg',
            link: 'https://google.com'
        })
    },
    //Cards de Atividades
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-windows",
            titulo: 'Windows',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-internet",
            titulo: 'Internet',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-word",
            titulo: 'Word',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Excel',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-powerpoint",
            titulo: 'PowerPoint',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-powerbi",
            titulo: 'PowerBI',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-photoshop",
            titulo: 'PhotoShop',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-coreldraw",
            titulo: 'CorelDraw',
            descricao: 'Aprender componentes e DOM',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'https://google.com'
        })
    },
    // {
    //     container: '.estudos',
    //     card: criarCard({
    //         titulo: 'Revisar Banco de Dados',
    //         descricao: 'Chaves primárias e relacionamentos',
    //         imagem: '/public/img/logo_icone_praticamente_white.svg'
    //     })
    // },
    // {
    //     container: '.projetos',
    //     card: criarCard({
    //         titulo: 'Site Portfólio',
    //         descricao: 'Atualizar projetos e layout',
    //         imagem: '/public/img/logo_icone_praticamente_white.svg'
    //     })
    // }
];
