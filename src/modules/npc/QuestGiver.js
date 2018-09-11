import { showHideQuests, showQuests } from '../showHideQuests.js';
import KillQuest from './quests/KillQuest.js';
import { questGiverInstance } from '../../app.js';
// import { backgroundMap } from '../maps.js';


//spider creature, jumps up to 3 spaces, slowly and randomly
//worth 1 point || strength 0.5 || max life 1
//level 1+

const stats = {
  img: 'images/quest-giver.png',
  pngWidth: 948,
  pngHeight: 1101,
  spriteWidth: 43,
  spriteHeight: 50,
  xStart: 150,
  yStart: 150,
  speed: 16,
  type: 'basic',
  maxLife: 1,
  strength: 0.5,
  points: 1,
  levelShowUp: 1
};

class QuestGiver {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.availableQuests = [new KillQuest()];
  };

  click(player) {
    let aq = this.availableQuests;
    if (player.quests[0]) {
      // placeholder quest stuff...clean up later
      if (player.quests[0].kills >= player.quests[0].killsToComplete) {
        // player.xp += player.quests[0].xp;
        // $('#player-xp').text(player.xp);
        player.gainXP(player.quests[0].xp);
        player.quests.splice(player.quests[0]);
        $('#quests-div ul').empty();
        questGiverInstance.availableQuests.push(new KillQuest());
        showQuests();
      }
    } else {
      if (aq.length > 0) {
        // placeholder for now...ugly...clean up to be actual quest
        player.quests.push(aq.splice(aq.indexOf(aq[0]), 1)[0]);
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
