
import { animateGame, background, zeldaPng, startGameButton } from '../../old-app.js';
import { ctxBackgroundMap, spriteMap, ctxEnemyMap, ctxExplosionCanvas, enemyMap, ctxSpriteMap } from '../maps.js';
import link from '../player.js';

//win game function
let winGame = function () {
  cancelAnimationFrame(animateGame);
  ctxBackgroundMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.winImage, 0, 0, 1920, 1080, 0, 0, background.mapWidth, background.mapHeight);
  ctxSpriteMap.drawImage(link.image, 90, 30, link.pngWidth, link.pngHeight, 165, 200, 71.25, 76);
  ctxSpriteMap.drawImage(zeldaPng, 0, 0, 14, 16, 295, 200, 66.5, 76);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Oh, you won?', 20, 40);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('That\'s neat I guess.', 20, 70);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Want a sandwich?', 20, 320);

  startGameButton.html('Replay game');
  startGameButton.css('visibility', 'visible');
};

export default winGame;
