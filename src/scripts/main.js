const games = document.querySelectorAll(".game");
const renderGameContainer = document.getElementById("render-game");
const painel = document.getElementById("painel");

games.forEach((game) => {
  game.addEventListener("click", () => {
    const gameId = game.id;

    const iframe = document.createElement("iframe");
    iframe.src = `../Jogos/${gameId}/index.html`;
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.border = "none";

    renderGameContainer.innerHTML = "";
    painel.style.display = "none";
    renderGameContainer.appendChild(iframe);

    const backButton = document.createElement("button");
    backButton.textContent = "Voltar";
    backButton.addEventListener("click", () => {
      window.location.reload();
    });

    renderGameContainer.appendChild(backButton);
  });
});
