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
  },
  button: document.getElementById("next-duel"),
};



function start() {
  state
}

start();