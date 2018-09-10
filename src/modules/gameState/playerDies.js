
import player1 from '../../app.js';
import { ctxSpriteMap, ctxSpriteMapDraw, spriteMap } from '../maps.js';

//link death spin
let playerDies = function() {
  console.log('in linkDies');
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMapDraw(link);
  if (link.xFrame === 0 && link.yFrame === 0) {
    link.xFrame = 90;
    link.yFrame = 30;
  } else if (link.xFrame === 90 && link.yFrame === 30) {
    link.xFrame = 61;
    link.yFrame = 0;
  } else if (link.xFrame === 61 && link.yFrame === 0) {
    link.xFrame = 29;
    link.yFrame = 0;
  } else if (link.xFrame === 29 && link.yFrame === 0) {
    link.xFrame = 0;
    link.yFrame = 0;
  };
};

export default linkDies;
