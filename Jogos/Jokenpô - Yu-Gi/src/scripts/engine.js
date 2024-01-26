const pathImg = "src/assets/icons/";

const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    playerCard: document.getElementById("player-field-card"),
    computerCard: document.getElementById("computer-field-card"),

    playerImgCard: document.getElementById("player-field-card"),
    computerImgCard: document.getElementById("computer-field-card"),
  },
  playerSides: {
    player1: document.getElementById("player-card"),
    player2: document.getElementById("computer-card"),
  },
  roundCards: 5,
  button: document.getElementById("next-duel"),
};

const cardData = [
  {
    id: 0,
    name: "Dragão Branco de Olhos Azuis",
    type: "Papel",
    img: `${pathImg}dragon.png`,
    winOf: [1],
    loseOf: [2],
  },
  {
    id: 1,
    name: "Mago Negro",
    type: "Pedra",
    img: `${pathImg}magician.png`,
    winOf: [2],
    loseOf: [0],
  },
  {
    id: 2,
    name: 'Exodia, "O proibido"',
    type: "Tesoura",
    img: `${pathImg}exodia.png`,
    winOf: [0],
    loseOf: [1],
  },
];

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);

  return cardData[randomIndex].id;
}

async function getCardImage(cardId, playerSide) {
  const cardImg = document.createElement("img");
  cardImg.src = `${pathImg}card-back.png`;
  cardImg.style.height = "100px";
  cardImg.setAttribute("data-id", cardId);
  cardImg.classList.add("card");

  if (state.playerSides[playerSide] === state.playerSides.player1) {
    cardImg.addEventListener("click", () => {
      setDuel(cardImg.getAttribute("data-id"), playerSide);
    });

    cardImg.addEventListener("mouseover", () => {
      drawSelectedCard(cardId);
    });
  }

  return cardImg;
}

async function setDuel(cardId) {
  await removeCardImages();

  state.fieldCards.playerImgCard.style.display = "block";
  state.fieldCards.computerImgCard.style.display = "block";

  let computerCardId = await placeComputerCard();

  state.fieldCards.playerCard.src = cardData[cardId].img;

  let duelResult = await getDuelResult(cardId, computerCardId);
  state.score.scoreBox.innerText = duelResult;

  renderNextDuelButton();
}

async function placeComputerCard() {
  // Função para impedir que o computador jogue uma carta que não tem na mão
  let computerCardId = await getRandomCardId();
  let computerCards = state.playerSides.player2.querySelectorAll("img");

  for (let card of computerCards) {
    if (card.dataset.id == computerCardId) {
      state.fieldCards.computerCard.src = cardData[computerCardId].img;
      return computerCardId;
    }
  }
  // A função é chamada recursivamente caso a carta sorteada não esteja na mão do computador
  return placeComputerCard();
}

async function renderNextDuelButton() {
  state.button.style.display = "block";
}

let newRound = false;

function resetDuel() {
  if (!newRound && state.roundCards === 0) {
    state.button.innerText = "Nova rodada";
    newRound = true;
    return;
  } else if (newRound) {
    state.roundCards = 5;
    start(state.roundCards);
  }

  let cards = state.playerSides.player1;
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => (img.style.display = "block"));

  cards = state.playerSides.player2;
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => (img.style.display = "block"));

  state.cardSprites.avatar.src = "";
  state.cardSprites.name.innerText = "Selecione";
  state.cardSprites.type.innerText = "uma carta";
  state.fieldCards.playerImgCard.style.display = "none";
  state.fieldCards.computerImgCard.style.display = "none";
  state.button.style.display = "none";
}

async function removeCardImages() {
  let cards = state.playerSides.player1;
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => (img.style.display = "none"));

  cards = state.playerSides.player2;
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => (img.style.display = "none"));
}

function removePlayedCards(playerCardId, computerCardId) {
  let removalDone = false;
  let cards = state.playerSides.player1;
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => {
    if (!removalDone && img.getAttribute("data-id") == playerCardId) {
      img.remove();
      removalDone = true;
    }
  });
  removalDone = false;
  cards = state.playerSides.player2;
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => {
    if (!removalDone && img.getAttribute("data-id") == computerCardId) {
      img.remove();
      removalDone = true;
    }
  });
  state.roundCards--;
}

async function getDuelResult(playerCardId, computerCardId) {
  const playerCard = cardData[playerCardId];
  const computerCard = cardData[computerCardId];
  removePlayedCards(playerCardId, computerCardId);

  if (playerCard.winOf.includes(computerCard.id)) {
    soundEffect("win");
    state.score.playerScore++;
    state.button.innerText = "Vitória";
  } else if (playerCard.loseOf.includes(computerCard.id)) {
    soundEffect("lose");
    state.score.computerScore++;
    state.button.innerText = "Derrota";
  } else {
    soundEffect("draw");
    state.button.innerText = "Empate";
  }

  return `Vitórias: ${state.score.playerScore}  Derrotas: ${state.score.computerScore}`;
}

function soundEffect(sound) {
  let audio = new Audio();
  audio.src = `src/assets/audios/${sound}.wav`;
  audio.play();
}

function drawSelectedCard(cardId) {
  const card = cardData[cardId];

  state.cardSprites.avatar.src = card.img;
  state.cardSprites.name.innerText = card.name;
  state.cardSprites.type.innerText = card.type;
}

async function drawCard(cardAmount, playerSide) {
  for (let i = 0; i < cardAmount; i++) {
    const cardId = await getRandomCardId();
    const cardImage = await getCardImage(cardId, playerSide);

    state.playerSides[playerSide].appendChild(cardImage);
  }
}

function start(cardAmount) {

  newRound = false;
  drawCard(cardAmount, "player1");
  drawCard(cardAmount, "player2");
}

start(state.roundCards);
