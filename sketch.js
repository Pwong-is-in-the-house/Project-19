var lion,lionImage;
var obstacle,obstacleImage,obstacleGroup;
var ground;
var chicken,chickenImage,foodGroup;
var Score;
function preload(){
  lionImage= loadImage("PNGPIX-COM-Lion-PNG-Transparent-Image-1.png") 
  obstacleImage=loadImage("55-558223_collection-of-transparent-background-high-quality-rock-clip.png");
  chickenImage=loadImage("fried_chicken_PNG14084.png")

  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  lion=createSprite(100,350,20,10)
  lion.addImage("lion",lionImage)
  lion.scale= 0.1;
    ground=createSprite(400,410,900,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
   lion.setCollider("rectangle",0,0,lion.width,lion.height);
  lion.debug = true
  obstacleGroup = new Group();
  foodGroup= new Group();
  Score=0;
}

function draw() {
  background(220);
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(keyDown("space")) {
      lion.velocityY = -10;
    }
      
    lion.velocityY = lion.velocityY + 0.8
      
       lion.collide(ground);
      if (foodGroup.isTouching(lion)){
        Score=Score+2;
      foodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(lion)){
      foodGroup.destroyEach();
          ground.velocityX = 0;
    lion.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    }
  spawnObstacles();
  spawnChicken();
  drawSprites();
      stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ Score,500,50);
     
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,360,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.05;
        
    obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
  }
}
function spawnChicken() {
  if (frameCount % 80 === 0) {
    chicken = createSprite(600,250,40,10);
    chicken.y = random(455,520);    
    chicken.velocityX = -5;

    chicken.lifetime = 300;
    lion.depth = chicken.depth + 1;

     chicken.addImage(chickenImage);
    chicken.scale=0.1;

    foodGroup.add(chicken);
  }
}
