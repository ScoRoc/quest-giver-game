import link from '../player.js';
import { showHideQuests, showQuests } from '../showHideQuests.js';
// import { backgroundMap } from '../maps.js';


//spider creature, jumps up to 3 spaces, slowly and randomly
//worth 1 point || strength 0.5 || max life 1
//level 1+

// const stats = {
//   img: 'images/tektite.png',
//   pngWidth: 16,
//   pngHeight: 15,
//   spriteWidth: 37.5,
//   spriteHeight: 40,
//   xStart: xStarting(40),
//   yStart: yStarting(45),
//   speed: 16,
//   type: 'basic',
//   maxLife: 1,
//   strength: 0.5,
//   points: 1,
//   levelShowUp: 1
// };

class QuestGiver {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  click() {
    link.quests.push('qqq');
    if (showHideQuests.showing()) {
      showQuests();
    }
  }

};

// class Tektite extends Enemy {
//   constructor() {
//     super(
//       stats.img,
//       stats.pngWidth,
//       stats.pngHeight,
//       stats.spriteWidth,
//       stats.spriteHeight,
//       stats.xStart,
//       stats.yStart,
//       stats.speed,
//       stats.type,
//       stats.maxLife,
//       stats.strength,
//       stats.points,
//       stats.levelShowUp
//     );
//     this.numberOfSpaces = [0, 1, 2, 3];
//   };
//
// };

export default QuestGiver;
