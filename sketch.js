// I did the additional assignments so that if the monkey's scale is less than a certain scale then the game will end
//I also kept the survival time from the 1st assignment
//each banana will increase the monkey's size by a tiny bit

var monkey, monkey_running, monkeyGroup;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground, sun, gameover, restart, sunImage, gameoverImage, restartImage;
var gamestate = "play";
var END;
var survivalTime = 0;
var bimage, jungleimage;
var bananaScore = 0

function preload() {

  monkey_running = loadImage("Image.jpg")

  bananaImage = loadImage("gun.jpg");
  obstaceImage = loadImage("download.png");
  restartImage = loadImage("restart.png")
  sunImage = loadImage("sun.png");
  cloudImage = loadImage("cloud.png");
  gameoverImage = loadImage("gameOver.png")
  jungle = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(500, 400);
 
  bimage = createSprite(200, 200, 10, 10);
 
  ground = createSprite(300, 380, 900, 10);
  ground.shapeColor = "black"
  ground.visible=false;
  
  monkey = createSprite(50, 150, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.12;
    
  gameover = createSprite(200, 200, 10, 10);
  gameover.addImage("gameover", gameoverImage);
 
  restart = createSprite(200, 250);
  restart.addImage("restart", restartImage);
  restart.scale = 0.09;
  
  monkeyGroup = new Group();
  FoodGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background("skyblue");
 
  bimage.addImage("image", jungle)
  
  drawSprites();
 
  if (mousePressedOver(restart) && gamestate === "end") {
    reset();
  }
  fill("white")
  textSize(20)
  
  text("Survival Time: " + survivalTime, 140, 50);
  text("Girls Collected: " + bananaScore, 120, 90);
 
  monkey.collide(ground);
  
  if (bimage.x < 0) {
      bimage.x = bimage.width / 2
    }
  
  if (gamestate === "play") {
    Banana();
    
    ground.velocityX = ground.velocityX - (survivalTime / 100) * 10;
    
    obstacleGroup.velocityX = obstacleGroup.velocityX - (survivalTime / 100) * 10;
    FoodGroup.velocityX = FoodGroup.velocityX - (survivalTime / 100) * 10;
    FoodGroup.setLifetimeEach = 100;
    
    gameover.visible = false;
    restart.visible = false;
    
    Obstacle();
    obstacleGroup.setLifetimeEach = 100;
   
    ground.velocityX=-10
    
    survivalTime = survivalTime + Math.round(frameRate() / 30);
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    bimage.velocityX=-5
    
    if (ground.x < 0) {
      ground.x = ground.x / 2;
    }
    
    if (keyDown("Space") && monkey.y > 250) {
      monkey.velocityY = -15
    }
    
    if (monkey.isTouching(FoodGroup)) {
      bananaScore = bananaScore + 1;
      monkey.scale = monkey.scale + 0.005;
      
      FoodGroup.destroyEach();
    }
    
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = monkey.scale -0.008;
      }
    
    if (monkey.scale < 0.05){
      gamestate = "end";
      END();
    }
   
    if (monkey.scale > 2.0){
      monkey.scale = 2.0;
    }
    
  }

}

function Banana() {
  if (frameCount % 80 === 0) {
   var randomPosition;
    randomPosition = random(150, 200)
    banana = createSprite(500, randomPosition, 10, 10);
    banana.addImage("image", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
    FoodGroup.add(banana);
  }
}

function Obstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 330, 10, 10);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.velocityX = -8;
    obstacle.scale = 0.2;
    
    obstacleGroup.add(obstacle);
  }
}

function END() {
  ground.velocityX = 0;
  bimage.velocityX=0;
  banana.velocityX = 0;
  monkey.velocityY = 0;
  obstacle.velocityX = 0;
  
  monkey.scale = 0.12;
  
  gameover.visible = true;
  restart.visible = true;
}

function reset() {
  gamestate = "play";
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  survivalTime = 0;
  bananaScore = 0;
}
function monkeyLife(){
  switch(bananaScore){
      
    case 5: monkey.scale = 0.14;
       break;
    case 10: monkey.scale = 0.16;
       break;
    case 15: monkey.scale = 0.18;
       break;
    case 20:monkey.scale = 0.20;
       break; 
       default: break;
         }
}