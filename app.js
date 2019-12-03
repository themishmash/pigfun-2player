/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//this is repeated below with the 'new game' function. 
var scores, roundScore, activePlayer, gamePlaying; //gamePlaying variable

init();
// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

// document.querySelector('#current-' + activePlayer).textContent = dice; //setter - set value

//showing how to manipulate html - but don't need to do this so just use the above one.


//create random variable to read from html and store  - example
//var x = document.querySelector('#score-0').textContent; //getter as gets a value
// console.log(x);


//this moves to init function down below too:
// //change css of document. hide dice before game begins
// document.querySelector('.dice').style.display = 'none';

// //getElementById method here as bit faster. set everything to 0
// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

// function btn() {
//   //Do something here
// }
// btn();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    //1. Random number - did this already. want this once someone clicks
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. display the results - match rolled number with dice image
  //create variable to store selection and use when need it
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  //3. update the round score IF rolled number was NOT a 1
  if (dice !== 1) {
    //add score 
    roundScore += dice; // same as roundScore = roundScore + dice;
    //displays roundScore
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {

    //NEXT PLAYER 
    // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // //to set round score back to 0
    // roundScore = 0;

    // document.getElementById('current-0').textContent = '0';
    // document.getElementById('current-1').textContent = '0';

    // //toggling between active and non-active
    // document.querySelector('.player-0-panel').classList.toggle('active'); //active class removed
    // document.querySelector('.player-1-panel').classList.toggle('active');

    // //no toggling between active
    // // //remove and add class of 'active'
    // // document.querySelector('.player-0-panel').classList.remove('active'); //active class removed
    // // document.querySelector('.player-1-panel').classList.add('active');

    // document.querySelector('.dice').style.display = 'none';
    
    nextPlayer();

  }
  }
  

}); //want eventlistener to call function - this is called callback function. could also write function in eventlistener - this would be anonymous function. anon function is one that can't be reused outside of the context. this is what we want in this case.

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //add current score to global score
  scores[activePlayer] += roundScore;

  //update the UI - user interface. 
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //check if player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector('#name-' + activePlayer).textContent = "Winner!";
    document.querySelector('.dice').style.display = 'none';
      //add winner css styling
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      //remove active player list from panel
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    nextPlayer();
  }
  }
  


//THIS CODE IS SAME AS ABOVE FOR 'next player' - so was put into function
  //next player
  // nextPlayer();

});


//new function - so not repeat yourself. function which doesn't receive parameters and doesn't return results. WE use it to not repeat our code. 

function nextPlayer() {
  //next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //to set round score back to 0
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //toggling between active and non-active
  document.querySelector('.player-0-panel').classList.toggle('active'); //active class removed
  document.querySelector('.player-1-panel').classList.toggle('active');

  //no toggling between active
  // //remove and add class of 'active'
  // document.querySelector('.player-0-panel').classList.remove('active'); //active class removed
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none'; 
}

//New Game - 
// document.querySelector('.btn-new').addEventListener('click', function() {
//   init(); //but this creating function to call another function. not really make sense. so do this instead...
// });

document.querySelector('.btn-new').addEventListener('click', init); //passing function not calling it so don't need () as if did include it would be immediately called and dont want that to happen. Just want event listener to know to call this function when clicked. 


function init() {
  //reset player scores
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  //change css of document. hide dice before game begins
  document.querySelector('.dice').style.display = 'none';

  //getElementById method here as bit faster. set everything to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //changing names back eg from winner to player 1 or 2
  document.getElementById('name-0').textContent = "Player 1";
  document.getElementById('name-1').textContent = "Player 2";

  //remove winner class. Remove from both players and don't know who won
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  //same for active player - remove from both. so we are sure no active class remains
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  //set first player to active player. add active class back as not sure which one it was removed from
  document.querySelector('.player-0-panel').classList.add('active');
}