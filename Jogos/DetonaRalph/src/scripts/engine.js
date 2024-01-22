const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    initialTime: 60,
    currentTime: null,
    lives: 3,
    timerId: null,
    countDownTimerId: null,
  },
};

function theFinalCountdown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime === 3) {
    soundEffect("countdown");
  }

  if (state.values.currentTime <= 0) {
    // Cenário 1: usuário não conseguiu nenhum ponto e tem 1 vida retirada
    if (state.values.result === 0 && state.values.lives > 1) {
      livesChecker();
      var plural = state.values.lives > 1 ? "chances!" : "chance!";
      alert(
        `Você não conseguiu acertar o Ralph! Mas ainda tem mais ${state.values.lives} ${plural}`
      );
      state.values.currentTime = state.values.initialTime;
    }
    // Cenário 2: usuário tem mais de 30 pontos
    else if (state.values.result >= 30) {
      soundEffect("win");
      clearInterval(state.values.timerId);
      clearInterval(state.values.countDownTimerId);
      endGame(state.values.result);
    }
    // Cenário 3: usuário tem menos de 30 pontos e mais de 1 vida
    else if (state.values.result < 30 && state.values.lives > 1) {
      livesChecker();
      var plural = state.values.lives > 1 ? "chances!" : "chance!";
      alert(
        `Você não conseguiu acertar o Ralph! Mas ainda tem mais ${state.values.lives} ${plural}`
      );
      state.values.currentTime = state.values.initialTime;
    }
    // Cenário 4: usuário está na última vida e tem menos de 30 pontos
    else if (state.values.lives === 1 && state.values.result < 30) {
      soundEffect("death");
      clearInterval(state.values.timerId);
      clearInterval(state.values.countDownTimerId);
      endGame(state.values.result);
    }
  }
}

function soundEffect(som) {
  var audio = new Audio(`src/audios/${som}.mp3`);
  audio.volume = som == "hit" || "missHit" ? 0.2 : 1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomPosition = Math.floor(Math.random() * 9);
  let rdSquare = state.view.squares[randomPosition];
  rdSquare.classList.add("enemy");
  state.values.hitPosition = rdSquare.id;
}

function livesChecker() {
  if (state.values.lives > 0) {
    state.values.lives--;
    state.view.lives.textContent = "x" + state.values.lives;
  }

  if (state.values.lives <= 0) {
    state.view.lives.textContent = "x0";
    soundEffect("death");
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
    endGame(state.values.result);
  }
}

function endGame(score) {
  var endMessage = document.createElement("div");
  endMessage.id = "end-game";
  endMessage.classList.add("center-content");
  var messageContent = document.createElement("p");
  messageContent.innerHTML =
    `FIM DO JOGO!<br/><br/>
      Sua pontuação final foi: ` + score;
  endMessage.appendChild(messageContent);

  var playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Jogar novamente";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
  playAgainBtn.style.marginTop = "15px";
  playAgainBtn.style.padding = "1rem";
  endMessage.appendChild(playAgainBtn);

  document.body.appendChild(endMessage);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (state.values.currentTime === 0 || state.values.lives === 0) {
        return;
      }
      if (square.id === state.values.hitPosition) {
        soundEffect("hit");
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      } else {
        soundEffect("missHit");
        livesChecker();
      }
    });
  });
}

function startGame() {
  var instructions =
    "Instruções:<br/>Acerte o Ralph o máximo de vezes que conseguir antes que o tempo acabe";
  var rules =
    "Regras:<br/>- O jogo inicia com 3 vidas. Você perde uma vida ao acertar uma caixa vazia ou quando o tempo se esgota e a pontuação é menor que 30.<br/>- Ao perder todas as vidas, o jogo encerra.<br/>- Você vencerá se sua pontuação total for maior que 30 quando o tempo se esgotar.";

  var startButton = document.createElement("button");
  startButton.textContent = "Iniciar Jogo";
  startButton.addEventListener("click", () => {
    init();
    document.body.removeChild(startMessage);
  });
  startButton.style.marginTop = "15px";
  startButton.style.padding = "1rem";

  var startMessage = document.createElement("div");
  startMessage.id = "start-game";
  startMessage.classList.add("center-content");

  var pInstructions = document.createElement("p");
  pInstructions.innerHTML = instructions;
  pInstructions.style.marginBottom = "15px";

  var pRules = document.createElement("p");
  pRules.innerHTML = rules;
  pRules.style.marginBottom = "15px";

  startMessage.appendChild(pInstructions);
  startMessage.appendChild(pRules);
  startMessage.appendChild(startButton);

  document.body.appendChild(startMessage);
}

function init() {
  state.values.currentTime = state.values.initialTime;
  state.values.timerId = setInterval(randomSquare, 1000);
  state.values.countDownTimerId = setInterval(theFinalCountdown, 1000);

  addListenerHitBox();
}

startGame();
