// Données de la piste en cours
const AUDIO = document.querySelector("audio");
const TRACK = document.getElementById("track");
const TRACK_TIME = document.getElementById("track-time");
const CURRENT_TIME = document.getElementById("current-time");
const SONG_TITLE = document.getElementById("song_title");
const ARTIST_NAME = document.getElementById("artist_name");
const SONG_PICTURE = document.getElementById("songPicture");
const VOLUME = document.getElementById("volume");

/* Boutons de controle du lecteur */
const PLAY_BTN = document.getElementById("play-btn");
const PAUSE_BTN = document.getElementById("pause-btn");
const NEXT_BTN = document.getElementById("skipF-btn");
const PREVIOUS_BTN = document.getElementById("skipB-btn");
const VOLUME_ICON = document.getElementById("volume_icon");
const VOLUME_OFF = document.getElementById("volume_off");

/* On récupère la durée de la chanson en cours */
let audioDuration = AUDIO.duration;

buildDuration(audioDuration);

/**
 * Convertit la durée d'une chanson en minutes et secondes
 * @param {*} duration
 */
function buildDuration(duration) {
  let minutes = Math.floor(duration / 60);
  let reste = duration % 60;
  let seconds = Math.floor(reste);
  seconds = String(seconds).padStart(2, 0);

  return minutes + ":" + seconds;
}

// Play
PLAY_BTN.addEventListener("click", () => {
  PAUSE_BTN.style.display = "inline-block";
  PLAY_BTN.style.display = "none";
  AUDIO.play();
  AUDIO.volume = VOLUME.value;
});

// Pause
PAUSE_BTN.addEventListener("click", () => {
  PLAY_BTN.style.display = "inline-block";
  PAUSE_BTN.style.display = "none";
  AUDIO.pause();
});

// Timer actuel de la chanson
AUDIO.addEventListener("timeupdate", function () {
  TRACK.value = this.currentTime;
  CURRENT_TIME.textContent = buildDuration(this.currentTime);
});

// Permet de faire avancer la musique en déplaçant le curseur
TRACK.addEventListener("input", function () {
  CURRENT_TIME.textContent = buildDuration(this.value);
  AUDIO.currentTime = this.value;
});

// Volume
VOLUME.addEventListener("click", function () {
  AUDIO.volume = this.value;
});

VOLUME_ICON.addEventListener("click", function () {
  AUDIO.volume = 0;
  VOLUME_ICON.style.display = "none";
  VOLUME_OFF.style.display = "inline-block";
});

VOLUME_OFF.addEventListener("click", function () {
  AUDIO.volume = 1;
  VOLUME_OFF.style.display = "none";
  VOLUME_ICON.style.display = "inline-block";
});

// Bouton Next
NEXT_BTN.addEventListener("click", function () {
  setSongInfos(+1);
});

// Bouton Suivant
PREVIOUS_BTN.addEventListener("click", function () {
  setSongInfos(-1);
});

// Récupération et affichage des données de la musique

function setSongInfos(index) {
  fetch("./assets/playlist.json")
    .then((res) => res.json())
    .then((songsData) => (SONG_TITLE.innerHTML = songsData[index].title));

  fetch("./assets/playlist.json")
    .then((res) => res.json())
    .then((songsData) => (ARTIST_NAME.innerHTML = songsData[index].artist));

  fetch("./assets/playlist.json")
    .then((res) => res.json())
    .then((songsData) => (AUDIO.src = songsData[index].path));

  fetch("./assets/playlist.json")
    .then((res) => res.json())
    .then((songsData) => (TRACK_TIME.textContent = songsData[index].duration));

  fetch("./assets/playlist.json")
    .then((res) => res.json())
    .then((songsData) =>
      SONG_PICTURE.setAttribute("src", songsData[index].img)
    );
}

setSongInfos(0);
