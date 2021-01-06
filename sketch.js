var monkey, monkey_running;
var ground;
var banana, bananaImage, obstacle, obstacleImage;
var bg, rg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_stop = loadImage("sprite_0.png");

  bi = loadImage("banana.png");
  ri = loadImage("obstacle.png");
  back = loadImage("WhatsApp Image 2021-01-03 at 2.16.48 PM.jpeg");
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50, 290, 100, 100);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addImage("monkey_stop", monkey_stop);
  monkey.scale = 0.1;

  ground = createSprite(200, 350, 410, 20);
  ground.shapeColor = "black";

  rg = createGroup();
  bg = createGroup();
}

function draw() {
  background("lightblue");
  text("Score: " + score, 300, 20);
  bg.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  rg.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  drawSprites();

  if (gameState === PLAY) {
    monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.8;
    if (keyDown("space") && monkey.y > 300) {
      monkey.velocityY = -17;
    }
    banana();
    rock();

    if (bg.isTouching(monkey)) {
      bg.destroyEach();
      score = score + 10;
    }

    if (rg.isTouching(monkey)) {
      gameState = END
    }
  } else if (gameState === END) {
    textSize(50);
    fill('red');
    text("GAMEOVER", 100, 200);
    monkey.velocityY = 0;
    monkey.changeImage("monkey_stop", monkey_stop);
    rg.setLifetimeEach(-1);
    bg.setLifetimeEach(-1);
    rg.setVelocityXEach(0);
    bg.setVelocityXEach(0);
    if (keyDown("r")) {
      score = 0;
      gameState = PLAY;
      rg.destroyEach();
      bg.destroyEach();
      monkey.changeAnimation("monkey_running", monkey_running);
    }
  }
}

function banana() {
  if (frameCount % 150 === 0) {
    var b = createSprite(400, 100, 20, 20);
    b.addImage("bi", bi);
    b.scale = 0.1;
    b.velocityX = -5;
    b.lifetime = 401 / 5;
    bg.add(b);
  }
}

function rock() {
  if (frameCount % 150 === 0) {
    var r = createSprite(400, 300, 20, 20);
    r.addImage("ri", ri);
    r.scale = 0.2;
    r.velocityX = -5;
    r.lifetime = 401 / 5;
    rg.add(r);
    r.setCollider("circle", 0, 0, 150);
  }
}