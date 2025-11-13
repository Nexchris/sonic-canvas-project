const canvas = document.getElementById('canvasGame');
const ctx = canvas.getContext('2d');  
canvas.width = 640;
canvas.height = 360;

const backgroundImage = new Image();
backgroundImage.src = "background/titleScreen.png";

const splashSong = new Audio('../music/splashSong.mp3');
splashSong.volume = 0.1;

const BoostSong = new Audio('../music/boostSong.mp3');
BoostSong.volume = 0.1;

function BoostPlay() {
  setTimeout(() => {
    BoostSong.play().catch(err => {});
  }, 5000);
}

let audioStarted = false;

const boostFrames = [
  '../sprite/Sonic/boost/boost_sonic_1.png',
  '../sprite/Sonic/boost/boost_sonic_2.png',
  '../sprite/Sonic/boost/boost_sonic_3.png',
  '../sprite/Sonic/boost/boost_sonic_4.png'
];

let sonicFrames = [];
let frameIndex = 0;

let backgroundLoaded = false;
let fontLoaded = false;
let sonicLoaded = false;

let SonicX = 10;
let SonicSpeed = 55;

function SonicRun() {
  SonicX += SonicSpeed;
}

const segaText = {
  x: 180,
  y: 200,
  width: 0,
  height: 100
};

let segaBlur = 0;
const segaBlurMax = 8;

backgroundImage.onload = () => {
  backgroundLoaded = true;
  tryStartTitleScreen();
};

document.fonts.load("100px SEGA").then(() => {
  fontLoaded = true;
  ctx.font = "100px SEGA";
  segaText.width = ctx.measureText("SEGA").width;
  tryStartTitleScreen();
});

let sonicFramesLoaded = 0;
const totalSonicFrames = boostFrames.length;

boostFrames.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    sonicFramesLoaded++;
    if (sonicFramesLoaded === totalSonicFrames) {
      sonicLoaded = true;
      tryStartTitleScreen();
    }
  };
  sonicFrames.push(img);
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const inX = mouseX >= segaText.x && mouseX <= segaText.x + segaText.width;
  const inY = mouseY >= segaText.y - segaText.height && mouseY <= segaText.y;

  if (inX && inY) onSegaClick();
});

function onSegaClick() {
  if (!audioStarted) {
    audioStarted = true;
    splashSong.play().then(() => {
      BoostPlay();
    }).catch(err => {});
  }
  segaBlur = segaBlurMax;
}

function tryStartTitleScreen() {
  if (backgroundLoaded && fontLoaded && sonicLoaded) {
    titleScreen();
    startSonicAnimation();
  }
}

function titleScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  if (segaBlur > 0) ctx.filter = `blur(${segaBlur}px)`;
  ctx.fillStyle = "blue";
  ctx.font = "100px SEGA";
  ctx.fillText("SEGA", segaText.x, segaText.y);
  ctx.restore();

  const sonicImg = sonicFrames[frameIndex];
  ctx.drawImage(sonicImg, SonicX, 260, 100, 100);
}

function startSonicAnimation() {
  setInterval(() => {
    frameIndex = (frameIndex + 1) % sonicFrames.length;
    SonicRun();

    if (segaBlur > 0) segaBlur = Math.max(0, segaBlur - 0.5);

    titleScreen();
  }, 50);
}
