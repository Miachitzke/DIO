// Cria uma classe Heroi com nome e tipo e a função de ataque
class Heroi {
    constructor(nome, tipo) {
        this.nome = nome;
        this.tipo = tipo;
    }

    // Método para atacar (formula a frase de retorno com base nas entradas do usuário)
    atacar(type) {
        console.log(`O ${this.tipo.tipo} ${this.nome} atacou usando ${this.tipo.ataque}`);
    }
}

// Array com os tipos de heróis e seus respectivos ataques
const tiposDeHerois = [
    { tipo: "guerreiro", ataque: "espada" },
    { tipo: "mago", ataque: "magia" },
    { tipo: "monge", ataque: "artes marciais" },
    { tipo: "ninja", ataque: "shuriken" }
];

// Função para obter o tipo de herói 
function obterTipoHeroi() {
    console.log("Escolha o tipo do herói:");
    
    tiposDeHerois.forEach((heroi, index) => {
        console.log(`${index + 1} - ${heroi.tipo}`);
    });
    
    let opcao = parseInt(prompt("Digite o número correspondente ao tipo: "), 10) - 1;
    
    // Verifica se a entrada é valida e existente no array 
    while (opcao < 0 || opcao >= tiposDeHerois.length || isNaN(opcao)) {
        console.log(`Opção inválida. Por favor, escolha um número entre 1 e ${tiposDeHerois.length}.`);
        opcao = parseInt(prompt("Digite o número correspondente ao tipo: "), 10) - 1;
    }
    
    // Retorna o tipo de herói e seu ataque de acordo com a opção escolhida.
    return tiposDeHerois[opcao];
}

// Recebe as entradas do usuário e invoca a função obterTipoHeroi para obter o tipo de herói
const nomeHeroi = prompt("Digite o nome do herói: ");
const tipoHeroi = obterTipoHeroi();

// Cria um objeto herói com base no nome e tipo escolhidos pelo usuário e invoca o método atacar
const heroi = new Heroi(nomeHeroi, tipoHeroi);
heroi.atacar(tipoHeroi);

// Código criado no VS Code e testado na web com o Playcode em JS (https://playcode.io/javascript)
