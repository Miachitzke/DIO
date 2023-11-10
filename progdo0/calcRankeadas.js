var vitorias = 0;
var derrotas = 0;

// recebe a quantidade de vitorias e derrotas
vitorias = prompt("Digite a quantidade de vitórias: ");
derrotas = prompt("Digite a quantidade de derrotas: ");

//repete o prompt caso o usuário não digite um número
while (isNaN(vitorias) || isNaN(derrotas)) {
    alert("A quantidade de vitórias e derrotas devem conter apenas números!");
    vitorias = prompt("Digite a quantidade de vitórias: ");
    derrotas = prompt("Digite a quantidade de derrotas: ");
}

// chama função com os valores e exibe resultado na tela 
alert(calcularNivelRankeada(vitorias, derrotas));

// função que calcula o level do heroi de acordo com o resultado da relação entre vitorias e derrotas
function calcularNivelRankeada(vitorias, derrotas) {
    var saldoVitorias = vitorias - derrotas;
    var nivel;

    if (saldoVitorias < 10) {
        nivel = "Ferro";
    } else if (saldoVitorias >= 11 && saldoVitorias <= 20) {
        nivel = "Bronze";
    } else if (saldoVitorias >= 21 && saldoVitorias <= 50) {
        nivel = "Prata";
    } else if (saldoVitorias >= 51 && saldoVitorias <= 80) {
        nivel = "Ouro";
    } else if (saldoVitorias >= 81 && saldoVitorias <= 90) {
        nivel = "Diamante";
    } else if (saldoVitorias >= 91 && saldoVitorias <= 100) {
        nivel = "Lendário";
    } else if (saldoVitorias >= 101){
        nivel = "Imortal";
    } else {
        nivel = "Valor inválido";
    }

    return 'O Herói tem de saldo de ' + saldoVitorias + ' vitórias e está no nível de ' + nivel;
}

// Código criado no VS Code e testado na web com o Playcode em JS (https://playcode.io/javascript)
