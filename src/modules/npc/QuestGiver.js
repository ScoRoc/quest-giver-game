import link from '../player.js';
import { showHideQuests, showQuests } from '../showHideQuests.js';
import KillQuest from './quests/KillQuest.js';
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
    this.availableQuests = [new KillQuest()];
  };

  click() {
    let aq = this.availableQuests;
    if (link.quests[0].kills >= killsToComplete) {
      link.experience += link.quests[0].experience;
      $('#player-xp').text(link.experience);
    } else {
      if (aq.length > 0) {
        // placeholder for now...ugly...clean up to be actual quest
        link.quests.push(aq.splice(aq.indexOf(aq[0]), 1)[0]);
      }
      if (showHideQuests.showing()) {
        showQuests();
      }
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
