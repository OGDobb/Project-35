//Create variables here
var dog, happyDog, database, foodS, foodStock, foodObj, milkImg;

var food;

var lastFed=5;
function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  //milkImg=loadImage("images/milk.png")
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();


  
}


function draw() {  
background(46,139,87);
//if(keyWentDown(UP_ARROW)){
//writeStock(foodS);
//dog.addImage(happyDog);

foodObj.display();
textSize(15);

fill("white");
stroke("black");

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}
drawSprites();
}



 
  //add styles here
//Text("Note: Press UP_ARROW Key to Feed Drago Milk!");



function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

