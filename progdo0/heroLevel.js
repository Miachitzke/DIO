var nomeHeroi = "";
var xpHeroi = 0;
var levelHeroi = "";

// recebe nome do heroi e quantidade de xp, após isso calcula o level do heroi de acordo com a faixa de xp

nomeHeroi = prompt("Digite o nome do heroi: ");
// recebe a quantidade de xp do heroi e converte em numero
xpHeroi = prompt("Digite a quantidade de xp: ");

//repete o prompt caso o usuário não digite um número
while (isNaN(xpHeroi)) {
    alert("O xp deve ser um número!");
    xpHeroi = prompt("Digite a quantidade de xp: ");
}

// calcula o level do heroi de acordo com a faixa de xp
if (xpHeroi <= 1000) {
    levelHeroi = 'Ferro';
} else if (xpHeroi >= 1001 && xpHeroi <= 2000) {
    levelHeroi = 'Bronze';
} else if (xpHeroi >= 2001 && xpHeroi <= 5000) {
    levelHeroi = 'Prata';
} else if (xpHeroi >= 5001 && xpHeroi <= 7000) {
    levelHeroi = 'Ouro';
} else if (xpHeroi >= 7001 && xpHeroi <= 8000) {
    levelHeroi = 'Platina';
} else if (xpHeroi >= 8001 && xpHeroi <= 9000) {
    levelHeroi = 'Ascendente';
} else if (xpHeroi >= 9001 && xpHeroi <= 10000) {
    levelHeroi = 'Imortal';
} else if (xpHeroi >= 10001) {
    levelHeroi = 'Radiante';
} else {
    levelHeroi = 'XP inserido inválido';
}

// exibe nome e nivel do heroi
alert("O herói de nome: " + nomeHeroi + " está no nível de: " + levelHeroi);

// Código criado no VS Code e testado na web com o Playcode em JS (https://playcode.io/javascript)
