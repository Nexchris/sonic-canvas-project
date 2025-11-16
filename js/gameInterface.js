const canvas = document.getElementById('canvasGame2');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

ctx.fillStyle = '#b0b0b0';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 🔵 Préchargement des frames
const idleSprites = [
  '../assets/sprite/Sonic/idle-sonic/idle_sonic_1.png',
  '../assets/sprite/Sonic/idle-sonic/idle_sonic_2.png',
  '../assets/sprite/Sonic/idle-sonic/idle_sonic_3.png',
  '../assets/sprite/Sonic/idle-sonic/idle_sonic_4.png',
  '../assets/sprite/Sonic/idle-sonic/idle_sonic_5.png'
];

const homingSprites = [
  '../assets/sprite/Sonic/homing-sonic/homing_sonic_1.png',
  '../assets/sprite/Sonic/homing-sonic/homing_sonic_2.png',
  '../assets/sprite/Sonic/homing-sonic/homing_sonic_3.png'
];

// Tableaux d'images
const idleFrames = [];
const homingFrames = [];

let loadedCount = 0;
const totalToLoad = idleSprites.length + homingSprites.length;

// 🔄 Charge un set de sprites
function loadFrames(spritePaths, targetArray, label) {
  spritePaths.forEach((path, i) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      loadedCount++;
      console.log(`${label} frame ${i + 1} chargée`);

      if (loadedCount === totalToLoad) {
        console.log("✅ Toutes les frames sont chargées !");
        startAnimation();
      }
    };
    targetArray.push(img);
  });
}

// Lance le chargement
loadFrames(idleSprites, idleFrames, "Idle");
loadFrames(homingSprites, homingFrames, "Homing");

// 🎮 État de Sonic
let frameIndex = 0;
let frameTimer = 0;
const frameDelay = 10; // plus grand = animation plus lente

let currentFrames = idleFrames;   // commence en idle
let currentAnimation = "idle";

// Position & gravité
let sonicX = 270;
let sonicY = 200;
const groundY = 200;  // position "sol"
let velocityY = 0;
const gravity = 0.8;
let isHoming = false;

// 🖱️ Input : touche Espace
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    console.log("Space key pressed - Homing!");

    // On ne relance pas le homing si déjà en homing
    if (!isHoming) {
      isHoming = true;
      currentAnimation = "homing";
      currentFrames = homingFrames;
      frameIndex = 0;

      // petit boost vers le haut
      velocityY = -10;
    }
  }
});

function gameInterface() {
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner Sonic avec l'animation en cours
  if (currentFrames.length > 0) {
    ctx.drawImage(currentFrames[frameIndex], sonicX, sonicY, 50, 50);
  }
}

function loop() {
  // Animation des frames
  frameTimer++;
  if (frameTimer >= frameDelay) {
    frameTimer = 0;
    frameIndex = (frameIndex + 1) % currentFrames.length;
    // console.log(`Frame : ${frameIndex}`);
  }

  // Gestion de la gravité seulement en homing
  if (isHoming) {
    velocityY += gravity;
    sonicY += velocityY;

    // Quand il "retouche le sol"
    if (sonicY >= groundY) {
      sonicY = groundY;
      velocityY = 0;
      isHoming = false;

      // Retour à l'animation idle
      currentAnimation = "idle";
      currentFrames = idleFrames;
      frameIndex = 0;
    }
  }

  gameInterface();
  requestAnimationFrame(loop);
}

function startAnimation() {
  requestAnimationFrame(loop);
}
