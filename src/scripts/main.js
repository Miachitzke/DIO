const games = document.querySelectorAll(".game");

games.forEach((game) => {
  game.addEventListener("click", () => {
    const gameId = game.id;

    switch (gameId) {
      case "detona-ralph":
        window.location.href = "../Jogos/DetonaRalph/index.html";
        break;
      case "jogo-memoria":
        window.location.href = "../Jogos/JogoDaMemoria/index.html";
        break;
      case "jokenpo":
        window.location.href = "../Jogos/Jokenpô - Yu-Gi/index.html";
        break;
      case "simulador-piano":
        window.location.href = "../Jogos/SimuladorPiano/index.html";
        break;
      default:
        break;
    }
  });
});
