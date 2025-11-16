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

// 🌱 Floor
const floorImg = new Image();
floorImg.src = '../assets/img/plateforms/floor_1.png';
const Treeimg = new Image();
Treeimg.src = '../assets/img/plateforms/tree_1.png';

// Tableaux d'images
const idleFrames = [];
const homingFrames = [];

let loadedCount = 0;
const totalToLoad = idleSprites.length + homingSprites.length + 1; // +1 pour le floor

// 🔄 Charge un set de sprites
function loadFrames(spritePaths, targetArray, label) {
  spritePaths.forEach((path, i) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      loadedCount++;
      console.log(`${label} frame ${i + 1} chargée`);

      if (loadedCount === totalToLoad) {
        console.log("✅ Toutes les images sont chargées !");
        startAnimation();
      }
    };
    targetArray.push(img);
  });
}

// Lance le chargement
loadFrames(idleSprites, idleFrames, "Idle");
loadFrames(homingSprites, homingFrames, "Homing");

// Compter aussi le floor
floorImg.onload = () => {
  loadedCount++;
  console.log("Floor chargé ✅");
  if (loadedCount === totalToLoad) {
    console.log("✅ Toutes les images sont chargées (avec le floor) !");
    startAnimation();
  }
};

// 🎮 État de Sonic
let frameIndex = 0;
let frameTimer = 0;
const frameDelay = 10;

let currentFrames = idleFrames;   // commence en idle
let currentAnimation = "idle";

// Position & gravité
let sonicX = 270;
let sonicY = 240;
const groundY = 240;
let velocityY = 0;
const gravity = 0.8;
let isHoming = false;

// 🖱️ Input : touche Espace
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    console.log("Space key pressed - Homing!");

    if (!isHoming) {
      isHoming = true;
      currentAnimation = "homing";
      currentFrames = homingFrames;
      frameIndex = 0;
      velocityY = -10;
    }
  }
});

function gameInterface() {
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessiner le floor (si l’image est bien chargée)
  if (floorImg.complete && floorImg.naturalWidth > 0) {
    ctx.drawImage(floorImg, -10, 280, canvas.width, 220);
  }

   ctx.drawImage(Treeimg, 50, 30, 145, 260);
    ctx.drawImage(Treeimg, 200, 30, 145, 260);
    ctx.drawImage(Treeimg, 350, 30, 145, 260);
    ctx.drawImage(Treeimg, 500, 30, 145, 260);

  // Dessiner Sonic
  if (currentFrames.length > 0) {
    ctx.drawImage(currentFrames[frameIndex], sonicX, sonicY, 50, 50);
  }
}

function loop() {
  frameTimer++;
  if (frameTimer >= frameDelay) {
    frameTimer = 0;
    frameIndex = (frameIndex + 1) % currentFrames.length;
  }

  if (isHoming) {
    velocityY += gravity;
    sonicY += velocityY;

    if (sonicY >= groundY) {
      sonicY = groundY;
      velocityY = 0;
      isHoming = false;
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
