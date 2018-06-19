
import { ctxSpriteMap, spriteMap } from '../maps.js';

//game over screen with replay button
let gameOverScreen = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = '#afd433';
  ctxSpriteMap.textAlign = 'center';
  ctxSpriteMap.fillText('Game Over', 259, 180);  //game over text
};

export default gameOverScreen;
