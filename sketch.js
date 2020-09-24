//Create variables here
var dog,dogImg,HappyDogImg,database,foodStock;
var feedPet,addFood,fedTime,lastFed,foodObj;
function preload()
{
	//load images here
	dogImg = loadImage("images/dog.png");
	HappyDogImg = loadImage("images/HappyDog.png")			
}

function setup() {
	createCanvas(900, 900);
	dog = createSprite(250,250,10,10)
	dog.addImage(dogImg);
	dog.scale = 0.5
	database = firebase.database()
	foodStock = database.ref('food');
	foodStock.on("value",readStock);
	foodObj = new Food();
    
  
}


function draw() {  
  background(46, 139, 87)
  var foodS = 20;
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  	lastFed = data.val();
  })
  drawSprites();
  //add styles here
  fill("white")
  stroke("black")
  
  text("Press UP_ARROW key to feed your pet",250,50)
}

function readStock(data){
	foodS=data.val();
}

function writeStock(x){
	database.ref('/').update({
		food:x
	})
}
function addFood(){
	foodS++;
	database.ref('/').update({
		food:foodS
	})
}
function feedDog(){
	dog.addImage(HappyDog);

	foodObj.update(foodObj.getStock()-1);
	database.ref('/').update({
		food:foodObj.getStock(),
		FeedTime:hour
	})
}