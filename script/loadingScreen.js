const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');  
canvas.width = 640;
canvas.height = 360;

const title = {
  width: 879,
  height: 209
};

ctx.font = "20px SEGA";
ctx.fillStyle = "white";

const backgroundImage = new Image();
const SonicTitle = new Image();

backgroundImage.src = "background/loadingScreen.gif";

let backgroundLoaded = false;


function loadingScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
