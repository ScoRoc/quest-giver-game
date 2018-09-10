import { ctxSpriteMap, ctxSpriteMapDraw, spriteMap } from '../maps.js';
import player1 from '../Player.js';

//Player death spin
let playerDies = function(player) {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMapDraw(player1);
  if (player1.xFrame === 0 && player1.yFrame === 0) {
    player1.xFrame = 90;
    player1.yFrame = 30;
  } else if (player1.xFrame === 90 && player1.yFrame === 30) {
    player1.xFrame = 61;
    player1.yFrame = 0;
  } else if (player1.xFrame === 61 && player1.yFrame === 0) {
    player1.xFrame = 29;
    player1.yFrame = 0;
  } else if (player1.xFrame === 29 && player1.yFrame === 0) {
    player1.xFrame = 0;
    player1.yFrame = 0;
  };
};

export default playerDies;
