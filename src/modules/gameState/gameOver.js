
import { ctxEnemyMap, ctxSpriteMap, spriteMap, deathCanvas } from '../maps.js';
import { newImage } from '../nonMathHelpers.js';
import player1 from '../Player.js';
import playerDies from './playerDies.js';
import gameOverScreen from './gameOverScreen.js';
import { startGameButton, animateGame } from '../../app.js';

//game over function and Player explosion
let gameOver = function() {
  cancelAnimationFrame(animateGame);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  deathCanvas.style.opacity = '0.56';
  player1.xFrame = 0;
  player1.yFrame = 0;
  let animateLinkDeath = setInterval(playerDies, .5);
  setTimeout(function() {
    clearInterval(animateLinkDeath);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxSpriteMap.drawImage(newImage('images/explosion-death.png'), 40, 10, 280, 285, player1.xMove, player1.yMove, 60, 60);
    setTimeout(function() {
      gameOverScreen();
      startGameButton.html('Replay game');
      startGameButton.css('visibility', 'visible');
    }, 1000);
  }, 2000);
};

export default gameOver;
