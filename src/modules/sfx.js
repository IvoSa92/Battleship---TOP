class AudioPlayer {
  playAttackStart() {
    let audio = new Audio("../src/assets/attack-start.wav");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1800);
  }

  playAttackHit() {
    let audio = new Audio("../src/assets/attack-hit.wav");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
  }

  placeShipSound() {
    let audio = new Audio("../src/assets/ship-horn.wav");
    audio.play();
    audio.playbackRate = 1.7;
    setTimeout(() => {
      audio.pause();
    }, 2000);
  }

  waterSplashSound() {
    let audio = new Audio("../src/assets/water-splash.wav");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
  }

  shipSunkSound() {
    let audio = new Audio("../src/assets/ship-sunk.mp3");
    audio.play();
  }

  startingGameSound() {
    let audio = new Audio("../src/assets/starting-game.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 6000);
  }
}

export default AudioPlayer;
