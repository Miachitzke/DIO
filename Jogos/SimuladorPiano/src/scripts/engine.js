const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const BPM = document.getElementById("bpm");
const powerButton = document.getElementById("power-button");
let mapedKeys = [];
let volume = 0.5;

const keysVisibility = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};
keysCheck.addEventListener("click", keysVisibility);

const volumeSwitch = (e) => {
  volume = e.target.value;
};
volumeSlider.addEventListener("input", volumeSwitch);

const playTune = (key) => {
  if (key === "metronome") {
    // src = "http://soundbible.com/grab.php?id=1705&type=mp3"; (som alternativo para metronomo)
    const metronome = new Audio(`src/audios/tick.mp3`);
    metronome.volume = volume;
    metronome.play();

    return;
  }

  let audio = new Audio(`src/audios/${key}.wav`);
  audio.volume = volume;
  audio.play();

  // Chama "animação" de tecla pressionada
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

pianoKeys.forEach((key) => {
  key.addEventListener("click", () =>
    key.dataset.key === "metronome"
      ? playMetronome()
      : playTune(key.dataset.key)
  );

  mapedKeys.push(key.dataset.key);
});

// Implementação do metronomo
powerButton.addEventListener("click", () => {
  powerButton.classList.contains("on")
    ? powerButton.classList.remove("on")
    : powerButton.classList.add("on");
});

// Atualiza BPM se o valor for alterado manualmente
BPM.addEventListener("input", playMetronome);

let metronomeTick;
function playMetronome() {
  if (powerButton.classList.contains("on")) {
    clearInterval(metronomeTick);

    const interval = 60000 / parseInt(BPM.value, 10);
    metronomeTick = setInterval(() => {
      playTune("metronome");
    }, interval);
  } else {
    clearInterval(metronomeTick);
  }
}