import { showHideQuests, showQuests } from '../showHideQuests.js';
import KillQuest from './quests/KillQuest.js';
import { newImage } from '../nonMathHelpers.js';
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
  x: 150,
  y: 150,
  type: 'quest-giver',
  levelShowUp: 1
};

class QuestGiver {
  constructor(stats) {
    this.image = newImage(stats.img);
    this.xFrame = 0;  // x starting point of src img for sprite frame
    this.yFrame = 0;  // y starting point of src img for sprite frame
    this.pngWidth = stats.pngWidth;  // width of src img sprite size
    this.pngHeight = stats.pngHeight;  // height of src img sprite size
    this.spriteWidth = stats.spriteWidth;  // width of sprite on canvas
    this.spriteHeight = stats.spriteHeight;  // height of sprite on canvas
    this.x = stats.x;  // x point of enemy on canvas
    this.y = stats.y;  // y point of enemy on canvas
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
        this.availableQuests.push(new KillQuest());
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

let questGiverInstance = new QuestGiver(stats);

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

export { QuestGiver, questGiverInstance };
