let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);

  collisionActionIfAny(head);

  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const collisionActionIfAny=function(head){
  if(didHeadHitWalls(head.getCoord()) || didHeadHitBody(head)){
    clearInterval(animator);
    gameOverAction();
  }
}

const gameOverAction=function(){
  let table=document.getElementById('keys');
  table.innerText='Game Over..click on the snake board to play again';
  table.onclick=(event)=>{location.reload()};
}

const didHeadHitWalls=function(headCoord){
  let xWallEdge=[-1,120];
  let yWallEdge=[-1,60];
  return xWallEdge.includes(headCoord[0]) || yWallEdge.includes(headCoord[1]);
}

const didHeadHitBody=function(head){
  function isByte(element){
    return head.isSameCoordAs(element);
  }
  return snake.body.some(isByte);
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
