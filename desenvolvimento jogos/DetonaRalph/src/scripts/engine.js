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
    initialTime: 20,
    currentTime: 20,
    lives: 3,
  },
  action: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(theFinalCountdown, 1000),
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
    // Cenário 2: usuário tem mais de 10 pontos
    else if (state.values.result > 10) {
      soundEffect("win");
      clearInterval(state.action.timerId);
      clearInterval(state.action.countDownTimerId);
      endGame(state.values.result);
    }
    // Cenário 3: usuário está na última vida e tem menos de 10 pontos
    else if (state.values.lives === 1) {
      soundEffect("death");
      clearInterval(state.action.timerId);
      clearInterval(state.action.countDownTimerId);
      endGame(state.values.result);
    }
  }
}

function soundEffect(som) {
  var audio = new Audio(`../src/audios/${som}.mp3`);
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
    clearInterval(state.action.timerId);
    clearInterval(state.action.countDownTimerId);
    endGame(state.values.result);
  }
}

function endGame(score) {
  var messageDiv = document.createElement("div");
  messageDiv.id = "end-game";
  var messageContent = document.createElement("p");
  messageContent.innerHTML =
    `FIM DO JOGO!<br/>
      Sua pontuação final foi: ` + score;
  messageDiv.appendChild(messageContent);

  var playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Jogar novamente";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
  playAgainBtn.style.marginTop = "15px";
  messageDiv.appendChild(playAgainBtn);

  document.body.appendChild(messageDiv);
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

function init() {
  document.body.click();
  addListenerHitBox();
}

init();
