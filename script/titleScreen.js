const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');  
canvas.width = 640;
canvas.height = 360;

const title = {
  width: 879,
  height: 209
};

const backgroundImage = new Image();
const SonicTitle = new Image();

backgroundImage.src = "background/titleScreen.png";
SonicTitle.src = "assets/SonicTitle.png";

let backgroundLoaded = false;
let titleLoaded = false;

backgroundImage.onload = () => {
  backgroundLoaded = true;
  if (titleLoaded) titleScreen();
};

SonicTitle.onload = () => {
  titleLoaded = true;
  if (backgroundLoaded) titleScreen();
};

function titleScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(SonicTitle, 220, 260, title.width / 4, title.height / 4);
}
