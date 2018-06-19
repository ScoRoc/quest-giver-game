
import link from '../player.js';
import { ctxSpriteMap, spriteMap } from '../maps.js';

//link death spin
let linkDies = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);
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
