import Dom from "./modules/dom.js";

//const newGame = new Game("Ivo", "Miri", 10);
const dom = new Dom();

dom.loadingScreen();

dom.gameBtn1Player.addEventListener("click", () => {
  dom.nameInput();
});
