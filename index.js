const songPlay = document.querySelector(".fa-play");
const songPause = document.querySelector(".fa-pause");
const songBackward = document.querySelector(".fa-backward");
const songForward = document.querySelector(".fa-forward");
const songName = document.querySelector(".controls h1");

songPlay.addEventListener("click", () => {
  songPlay.style.display = "none";
  songPause.style.display = "block";
});
songPause.addEventListener("click", () => {
  songPause.style.display = "none";
  songPlay.style.display = "block";
  stopSongs();
  pauseOther();
});

const songList = document.querySelectorAll(".song-list button");
const songListPause = document.querySelectorAll(".song-list .fa-pause");
const songListPlay = document.querySelectorAll(".song-list .fa-play");

const pauseOther = () => {
  songListPlay.forEach((buttonPlay) => {
    buttonPlay.style.display = "inline";
    buttonPlay.parentElement.querySelector(".fa-pause").style.display = "none";
  });
};
songListPlay.forEach((buttonPlay) => {
  buttonPlay.addEventListener("click", () => {
    pauseOther();
    buttonPlay.parentElement
      .querySelector("audio")
      .addEventListener("timeupdate", progressBarFill);
    songPlay.style.display = "none";
    songPause.style.display = "block";
    buttonPlay.style.display = "none";
    buttonPlay.parentElement.querySelector(".fa-pause").style.display =
      "inline";
  });
});
songListPause.forEach((buttonPause) => {
  buttonPause.addEventListener("click", () => {
    songPlay.style.display = "inline";
    songPause.style.display = "none";
    buttonPause.style.display = "none";
    buttonPause.parentElement.querySelector(".fa-play").style.display =
      "inline";
  });
});
songList.forEach((song) => {
  song.addEventListener("click", (e) => {
    const value = e.target.classList.value;
    const songAudio = song.querySelector("audio");

    stopSongs();

    if (value === "fas fa-play") {
      songName.innerText = song.innerText;

      songAudio.play();
      rotateMedia();
    }
  });
});

function stopSongs() {
  songList.forEach((song) => {
    const songAudio = song.querySelector("audio");
    songAudio.pause();
    songAudio.currentTime = 0;
    stopRotateMedia();
  });
}

const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress");

function progressBarFill(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  console.log(currentTime,duration);
  if(currentTime === duration){
    stopRotateMedia();
    progressBar.style.width = `${0}%`;
  }
}
const mediaArt = document.querySelector(".media-art");

function rotateMedia() {
  mediaArt.style.animation = "rotate 20s infinite linear";
}
function stopRotateMedia() {
  mediaArt.style.animation = "";
}
