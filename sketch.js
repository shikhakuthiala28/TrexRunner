// DEFINIG THE TREX VARIABLES
var trex, trex_running, trex_collided;

// DEFINING GROUND VARIABLES
var ground, ground_moving, invisibleground, invisibleground_moving;

// DEFINING CLOUD VARIABLES
var cloud, cloud_moving;

// DEFINING CACTUS VARIABLES
var cactus, cactus_moving1, cactus_moving2, cactus_moving3, cactus_moving4, cactus_moving5, cactus_moving6, random_cactus; 

//DEFINING SCORE VARIABLE
var score=0;

//DEFINING GROUP VARIABLES
var cloudGroup, cactusGroup;

//DEFINING THE GAMESTATE VARIABLES
var gameState="play";

//DEFINING GAMEOVER AND RESTART VARIABLES
var gameOver, gameOverimg, reStart, reStartimg;

//DEFINING THE THREE SOUND VARIABLES
var jumpSound, dieSound, checkpointSound;

// DEFINING THE PRELOAD FUNCTION
function preload(){
  
  // CREATING THE RUNNING DINOSAUR
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  //CREATING THE COLLISSION ANIMATION
  trex_collided=loadAnimation("trex_collided.png")
  
  // ADDING THE GROUND IMAGE
  ground_moving=loadAnimation("ground2.png");
  
  //ADDING THE INVISIBLE GROUND IMAGE
  invisibleground_moving=loadAnimation("ground2.png");
  //ADDING JUMP SOUND
  jumpSound=loadSound("jump.mp3");
  
  //ADDING COLLIDE SOUND
  dieSound=loadSound("die.mp3");
  
  //ADDING CHECKPOINT SOUND
  checkpointSound=loadSound("checkPoint.mp3");
  
  //ADDING THE MOVING CLOUD
  cloud_moving=loadImage("cloud.png");
  
  //ADDING GAMEOVER IMAGE.
  gameOverimg=loadImage("gameOver.png");
  
  //ADDING RESTART IMAGE
  reStartimg=loadImage("restart.png")
  
  //ADDING THE MOVING CACTUS
  cactus_moving1= loadImage("obstacle1.png");
  cactus_moving2= loadImage("obstacle2.png");
  cactus_moving3= loadImage("obstacle3.png");
  cactus_moving4= loadImage("obstacle4.png");
  cactus_moving5= loadImage("obstacle5.png");
  cactus_moving6= loadImage("obstacle6.png");

}

// THE SETPUT FUNCTION
function setup(){
 
  //CREATING THE CANVAS OF SIZE 400,400
  createCanvas(600,300);
  
// CREATING THE TREX SPRITE ADDING ANIMATION SCALE AND SETTING THE X POSITION OF THE SPRITE 
  trex=createSprite(80,250,20,20);
  trex.addAnimation("run",trex_running);
  trex.scale=0.5;
  trex.x=20;
  trex.addAnimation("collide",trex_collided);
 // trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  
// CREATING GROUND SPRITE AND ADDING ANIMATION TO THE GROUND SPRITE
  ground=createSprite(300,280,400,20);
  ground.addAnimation("groundmoves",ground_moving);
  
  //CREATING GAMEOVER SPRITE
  gameOver=createSprite(300,80);
  gameOver.addImage(gameOverimg);
  gameOver.scale=0.5;
  gameOver.visible=0;
  
  //CREATING RESTART SPRITE
  reStart=createSprite(300,120);
  reStart.addImage(reStartimg)
  reStart.scale=0.5;
  reStart.visible=0;            
  
  
//CREATING INVISIBLE GROUND SPRITE
  invisibleground=createSprite(200,290,400,10);
  invisibleground.addAnimation("invisiblegroundmoves",invisibleground_moving);
  invisibleground.visible=false;
  
  //CREATING CLOUD GROUP
  cloudGroup=new Group();
  
  //CREATING CACTUS GROUP
  cactusGroup=new Group();
 
}

// CREATING RANDOM CLOUDS IN THE SKY.
function cloud_spawn(){
  
  if(frameCount % 50 == 0){
      // CREATING CLOUD SPRITE ANDD ANIMATION AND SCALE.
      cloud=createSprite(550,100,20,20);
      cloud.addImage(cloud_moving);
      cloud.y=Math.round(random(70,180));
      cloud.velocityX=-5;
      cloud.depth=trex.depth;
      trex.depth++;
     
   cloud.lifetime=100;
   cloudGroup.add(cloud);
  }
}

//CREATING RANDOM CACTUS AS OBSTACLES.
function create_cactus(){
  
  if(frameCount % 100 == 0){
    cactus=createSprite(550,265,20,20);
    cactus.velocityX=-(3+5*score/150);
    
    random_cactus=Math.round(random(1,6)); 
   
  if(random_cactus==1){
    cactus.addImage(cactus_moving1);
  }
    else if(random_cactus==2){
      cactus.addImage(cactus_moving2);
    }
    else  if(random_cactus==3){
    cactus.addImage(cactus_moving3);
  }
    else  if(random_cactus==4){
    cactus.addImage(cactus_moving4);
  }
     else if(random_cactus==5){
    cactus.addImage(cactus_moving5);
  }
    else{
      cactus.addImage(cactus_moving6);
    }
   cactus.scale=0.6; 
   cactus.lifetime=200; 
   cactusGroup.add(cactus);
  }
}

// THE DRAW FUNCTION
function draw(){

  // PAINTING THE BACKGROUND LIGHT BLUE
   background("black");
  
 
  //DISPLAY THE SCORE.
  fill("red");
  text("Score:"+" "+score,500,30);
  noFill();
  
  // MAKING THE TREX STAY ON THE GROUND
  trex.collide(invisibleground); 
    
  
  //CHECKING THE STATE OF THE GAME
  if(gameState=="play"){
    
      //COUNTING THE SCORE 
  score= Math.round(score+getFrameRate()/60);
    
    
    // MAKING THE GROUND MOVE INFINITELY.
  ground.velocityX=-(3+3*score/150);
    
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    

     // MAKING THE TREX JUMP
  if(keyDown("space") && trex.y>260){
    trex.velocityY=-10;   
    jumpSound.play();
  }
  trex.velocityY=trex.velocityY+0.4;
   //console.log(trex.y);
    
    // CALLING CLOUD CREATING FUNCTION
  cloud_spawn();

  // CALLING CACTUS CREATING FUNCTION 
  create_cactus();
    
    if(score>0 && score%150==0){
      checkpointSound.play();
    }
  }
  else if(gameState=="end"){
    
  trex.changeAnimation("collide",trex_collided); 
    
  gameOver.visible=true;
  reStart.visible=true;
    
  // MAKING Everything STOP.
  ground.velocityX=0; 
  cloudGroup.setVelocityXEach(0);
  cloudGroup.setLifetimeEach(-1);
  cactusGroup.setVelocityXEach(0);
  cactusGroup.setLifetimeEach(-1);
  trex.velocityY=0;
    
      //RESTARTING THE GAME ON MOUSE CLICK
  if(mousePressedOver(reStart)){
    reset();
  }
    
  }
  
  //CHANGING THE GAME STATE
    if(cactusGroup.isTouching(trex)){
      gameState="end";
      dieSound.play();
    }
  
  // DRAWING ALL THE SPRITES
  drawSprites();
}
function reset(){
  
    score=0;
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    gameOver.visible=false;
    reStart.visible=false;
    trex.changeAnimation("run",trex_running);
    gameState="play";
}