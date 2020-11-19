var PLAY = 0;
var END = 1;
var gamestate = PLAY;



var monkey, monkey_running, monkey_death;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisair;
var bananas;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_death = loadAnimation("monkey-headache-pain-illustration_gg105169836.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);
  ground = createSprite(300, 600, 1200, 40);
  monkey = createSprite(40, 560, 20, 20);
  monkey.addAnimation("bruh", monkey_running);
  invisair = createSprite(300, 200, 600, 10);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}

function Banas() {
  if (frameCount % 140 === 0) {

    banana = createSprite(600,random(120,200), 30, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    FoodGroup.add(banana);
  }
}

function Obstace() {
  if (frameCount % 140 === 0) {

    obstacle = createSprite(600, 560, 30, 40);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(6 + score / 100);

    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  }
}

function draw() {

  Banas();
  Obstace();

  if (gamestate === PLAY) {
    
    
    invisair.shapeColor = "white";
    score = frameCount;
    background("white")
    drawSprites();
    text("Survival Time:" + score, 200, 40);
    ground.velocityX = -3;
    monkey.scale = 0.15;
    monkey.collide(ground);

    if (ground.x < 300) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")) {
      monkey.velocityY = -11;
    }


    monkey.velocityY = monkey.velocityY + 1.0;

  }
if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      monkey.x=40;
    }
  monkey.bounceOff(invisair);
  if (monkey.collide(obstacleGroup)) {
    monkey.changeAnimation("monkey_death",monkey_death);
    gamestate = END;
  }
}
if (gamestate === END) {
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);

}