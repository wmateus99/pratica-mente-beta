import { criarCard } from './cards.js';

export const cardsProntos = [
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Primeira Aula',
            descricao: 'Todo grande começo começa com o primeiro passo. Aproveite sua primeira aula!',
            imagem: '/public/img/cards/pri-aula.svg',
            link: 'src/pages/primeira_aula/mouse-practice.html'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Jogo de Digitação',
            descricao: 'Desafie seus dedos e turbine sua velocidade no jogo de digitação!',
            imagem: '/public/img/cards/game-digitacao.svg',
            link: 'src/pages/digitacao/digitar.html'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "",
            titulo: 'Plataforma TsiFLix',
            descricao: 'Conhecimento na tela, no seu tempo: explore tudo o que a TSIFLIX oferece!',
            imagem: '/public/img/cards/Tsi.svg',
            link: 'https://escolatsi.com/escolatsi/portal/access'
        })
    },
    {
        container: '.card-home',
        card: criarCard({
            classAdd: "qrtsi",
            titulo: 'Avalie a Escola Tsi',
            descricao: 'Sua opinião transforma! Avalie a Escola TSI e nos ajude a evoluir.',
            imagem: '/public/img/cards/qr-tsi.svg',
            link: 'https://www.google.com/maps/place/Escola+TSI+Inform%C3%A1tica/@-4.0286686,-44.4638809,898m/data=!3m1!1e3!4m8!3m7!1s0x78afc1a7fc390fd:0xeec95b5a1a0bbf00!8m2!3d-4.028674!4d-44.461306!9m1!1b1!16s%2Fg%2F1ptxhstbr?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D'
        })
    },
    // Cards de Atividades
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-windows",
            titulo: 'Windows',
            descricao: 'Domine o Windows e aumente sua produtividade no dia a dia!',
            imagem: '/public/img/cards/windows.png',
            link: '/src/pages/windows.html'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-internet",
            titulo: 'Internet',
            descricao: 'Explore a internet com segurança e consciência digital.',
            imagem: '/public/img/cards/internet.png',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-word",
            titulo: 'Word',
            descricao: 'Crie documentos incríveis com as ferramentas certas do Word!',
            imagem: '/public/img/cards/word.png',
            link: '/src/pages/word.html'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Excel',
            descricao: 'Transforme dados em decisões com fórmulas e gráficos no Excel!',
            imagem: '/public/img/cards/excel.png',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-powerpoint",
            titulo: 'PowerPoint',
            descricao: 'Encante sua audiência com apresentações poderosas!',
            imagem: '/public/img/cards/powerpoint.png',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-powerbi",
            titulo: 'PowerBI',
            descricao: 'Visualize dados com clareza e tome decisões com Power BI!',
            imagem: '/public/img/cards/powerbi.png',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-photoshop",
            titulo: 'PhotoShop',
            descricao: 'Crie imagens incríveis com os recursos avançados do Photoshop!',
            imagem: '/public/img/cards/photoshop.png',
            link: 'https://google.com'
        })
    },
    {
        container: '.atividades',
        card: criarCard({
            classAdd: "bg-coreldraw",
            titulo: 'CorelDraw',
            descricao: 'Desperte seu lado criativo com designs vetoriais no CorelDRAW!',
            imagem: '/public/img/cards/coreldraw.png',
            link: 'https://google.com'
        })
    },
    // Cards de Revisão
    {
        container: '.revisao',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Excel Avançado',
            descricao: 'Domine fórmulas, dashboards e automações com Excel Avançado!',
            imagem: '/public/img/cards/excel.png',
            link: './revisao/excel-avancado.html'
        })
    },
    {
        container: '.revisao',
        card: criarCard({
            classAdd: "",
            titulo: 'Em Breve',
            descricao: 'Será adicionado mais exercícios em breve!',
            imagem: '',
            link: 'https://google.com'
        })
    },
    // Cards de Revisão - Excel Avançado
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 01',
            descricao: 'Revisão de Fórmulas e Funções',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/01.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 02',
            descricao: 'Funções De Texto',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/02.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 03',
            descricao: 'Funções Lógicas',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/03.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 04',
            descricao: 'Funções de Matemática, Trigonometria e Funções de Estatísticas - Parte 1',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/04.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 05',
            descricao: 'Funções de Estatísticas - Parte 2',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/05.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 06',
            descricao: 'Funções de Data',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/06.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 07',
            descricao: 'Funções de Pesquisa e Referência',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/07.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 08',
            descricao: 'Tabela Dinâmica e Formatação Condicional',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/09.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 09',
            descricao: 'Gráfico Dinâmico e Classificação de dados',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/10.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 10',
            descricao: 'Utilizando Formulários',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/11.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 11',
            descricao: 'Utilizando Macros e Noções de VBA',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/12.html'
        })
    },
    {
        container: '.revisao-excel-avancado',
        card: criarCard({
            classAdd: "bg-excel",
            titulo: 'Atividade 12',
            descricao: 'Solver e Funções Financeiras',
            imagem: '/public/img/cards/excel.png',
            link: './excel-avancado/13.html'
        })
    },

    // Atividades de Windows
    {
        container: '.atividades-windows',
        card: criarCard({
            classAdd: "bg-windows",
            titulo: 'Atalhos do Teclado',
            descricao: 'Atividade para treinar atalhos, texto no Word e janelas no Windows no dia a dia.',
            imagem: '/public/img/cards/windows.png',
            link: '/src/pages/windows/atividades/01.html'
        })
    },
    {
        container: '.atividades-windows',
        card: criarCard({
            classAdd: "bg-windows",
            titulo: 'Manipule Pastas',
            descricao: 'Praticar manipulação de arquivos, download, edição no Bloco de Notas e colagem no Paint.',
            imagem: '/public/img/cards/windows.png',
            link: '/src/pages/windows/atividades/02.html'
        })
    },

    //Textos
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 01',
            descricao: 'Rumo a um Futuro Sustentável',
            imagem: '/public/img/cards/excel.png',
            link: './textos/01.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 02',
            descricao: 'Lições Aprendidas e Perspectivas Futuras',
            imagem: '/public/img/cards/excel.png',
            link: './textos/02.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 03',
            descricao: 'Sustentabilidade na Agricultura do Século XXI',
            imagem: '/public/img/cards/excel.png',
            link: './textos/03.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 04',
            descricao: 'Superando Desafios na Era Moderna',
            imagem: '/public/img/cards/excel.png',
            link: './textos/04.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 05',
            descricao: 'Explorando Novos Horizontes na Experiência Humana',
            imagem: '/public/img/cards/excel.png',
            link: './textos/05.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 06',
            descricao: 'A Influência da Cultura Pop na Sociedade Contemporânea',
            imagem: '/public/img/cards/excel.png',
            link: './textos/06.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 07',
            descricao: 'Inovação e Criatividade no Mundo Moderno',
            imagem: '/public/img/cards/excel.png',
            link: './textos/07.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 08',
            descricao: 'Além dos Limites Terrestres',
            imagem: '/public/img/cards/excel.png',
            link: './textos/08.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 09',
            descricao: 'Impactos da Internet das Coisas na Vida Cotidiana',
            imagem: '/public/img/cards/excel.png',
            link: './textos/09.html'
        })
    },
    {
        container: '.textos',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 10',
            descricao: 'Desafios e Oportunidades para a Sociedade Moderna',
            imagem: '/public/img/cards/excel.png',
            link: './textos/10.html'
        })
    },

    // Atividade de Word

    {
        container: '.word',
        card: criarCard({
            classAdd: "",
            titulo: 'Texto 10',
            descricao: 'Desafios e Oportunidades para a Sociedade Moderna',
            imagem: '/public/img/cards/word.png',
            link: './word/10.html'
        })
    },
];
