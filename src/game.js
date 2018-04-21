const Game=function(numberOfRows,numberOfCols){
  this.rows=numberOfRows;
  this.col=numberOfCols;
  this.snake={};
}

Game.prototype={
  addSnake:function(){
    startGame();
  },

}
