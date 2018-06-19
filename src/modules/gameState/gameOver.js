
import { ctxEnemyMap, ctxSpriteMap, spriteMap, deathCanvas } from '../maps.js';
import link from '../player.js';
import linkDies from './linkDies.js';
import gameOverScreen from './gameOverScreen.js';
import { startGameButton, animateGame, explosionPng } from '../../old-app.js';

//game over function and link explosion
let gameOver = function() {
  cancelAnimationFrame(animateGame);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  deathCanvas.style.opacity = '0.56';
  link.xFrame = 0;
  link.yFrame = 0;
  let animateLinkDeath = setInterval(linkDies, .5);
  setTimeout(function() {
    clearInterval(animateLinkDeath);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxSpriteMap.drawImage(explosionPng, 40, 10, 280, 285, link.xMove, link.yMove, 60, 60);
    setTimeout(function() {
      gameOverScreen();
      startGameButton.html('Replay game');
      startGameButton.css('visibility', 'visible');
    }, 1000);
  }, 2000);
};

export default gameOver;
