var guessItem = null;
var Interval = 60;
var results = [];
var solution = null;
var gameOver = false;

function setup() {
  createCanvas(800, 300);
}

function draw() {
  var gameScore = getGameScore(results);
  
  if (gameScore.loss === 3 || gameScore.total === 10) {
      gameOver = true;
      displayGameOver(gameScore);
      return;
  } 
  
  background(220);
  if (frameCount === 1 || frameCount % Interval === 0) {
    solution = null;
     guessItem = new GuessItem(width/2, height/2, 10);
    
  }

  if (guessItem){
    guessItem.render();
  }
  
    if (solution === true || solution === false) {
      solutionMessage(gameScore.total, solution);
    }
     
}

function solutionMessage(seed, solution) {
  var trueMessages = [
    'GOOD JOB!',
    'DOING GREAT',
    'OMG!',
    'SUCH WIN!',
    'I APPRECIATE YOU',
    'XD',
    
  ];
  var falseMessages = [
    'OH NO!',
    'BETTER LUCK NEXT TIME!',
    'PFTTTT',
    'FUCK',
    ':`(',
  ];
  var messages;
  
  push();
  textAlign(CENTER, CENTER);
  textSize(36);
  //guess text background color
  fill(237,34,93);
  randomSeed(seed*10000);
  
  if (solution ===true){
    background(255);
    messages = trueMessages;
  } else if (solution === false) {
    background(0);
    messages = falseMessages;
  }
  translate(width/2, height/2);
  text(messages[parseInt(random(messages.length), 10)], 0, 0);
  pop();
}

function displayGameOver(score){
  background(255);
  push();
  textAlign(CENTER,CENTER);
  translate(width/2, height/2);
  
  fill(237,34,93);
  textSize(24);
  text('GAME OVER', 0, 0);
  
  fill(0);
  translate(0, 36);
  text('you have ' + score.win + ' correct guesses',0,0);
  
  var alternatingValue = map(sin(frameCount/10), -1, 1, 0, 255);

  fill(237,34,93, alternatingValue);
  textSize(16);
  translate(0, 80);
  text('PRESS ENTER', 0,0);
  pop();
}

function getGameScore(score) {
  var wins = 0;
  var losses = 0;
  var total = score.length;
  
  for(var i = 0; i < total; i++) {
    var item = score[i];
    if (item === true) {
      wins = wins + 1;
    } else {
      losses = losses + 1;    
      }
    }
  
    return {win: wins, loss:losses, total: total};
}

function restartTheGame(){
  results = [];
  solution = null;
  gameOver = false;
}

function keyPressed(){
  if (gameOver === true) {
      if(keyCode === ENTER) {
        console.log('restart the game');
        restartTheGame();
        return;
      } 
  }
 
  if (guessItem !== null)  {
     console.log('you pressed', key);
     solution = guessItem.solve(key);
     if (solution) {
      results.push(true);
      } else {
        results.push(false);
      }
      guessItem = null; 
  } else {
    console.log('nothing to be solved');
  }
 
}

function GuessItem(x, y, scl){
  this.x = x;
  this.y = y;
  this.scale = scl;
  this.scaleIncrement = 0.5;
  this.content = getContent();
  this.alpha = 255;
  this.alphaDecrement = 3;
  this.solved;
  this.contentMap = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
    
  };
  
  
  
  function getContent(){
      return String(parseInt(random(10), 10));
  }
  
  
  this.solve = function(input) {
    
    if (input === this.content) {
      this.solved = true;
    }  else{
      this.solved = false;
    }
    return this.solved;
  }
  
  this.render = function() {
    if (this.solved ===false){
      return;
    }
    push();
    fill(0, this.alpha);
    textAlign(CENTER, CENTER);
    translate(this.x, this.y);
    scale(this.scale);
    text(this.contentMap[this.content], 0, 0);
    this.scale = this.scale + this.scaleIncrement;
    this.alpha = this.alpha - this.alphaDecrement;
    pop();
  }
}