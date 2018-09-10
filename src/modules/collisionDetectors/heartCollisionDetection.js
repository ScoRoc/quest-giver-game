import { xStarting, yStarting } from '../mathHelpers.js';
import { game } from '../../app.js';
import { updateHeartDisplay } from '../items/hearts.js';

//Collision detection between Player and objects
let heartCollisionDetection = function(player, heartItem) {
  let x1 = player.x;
  let y1 = player.y;
  let x2 = heartItem.x;
  let y2 = heartItem.y;
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && player.life <= 3.5 && heartItem.show === true) {
    heartItem.show = false;
    if (heartItem.type === 'max') {
      heartItem.x = xStarting(heartItem.spriteWidth);
      heartItem.y = yStarting(heartItem.spriteHeight);
      if (player.life < player.maxLife && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life = player.maxLife;
        updateHeartDisplay(player);
      }
    } else if (heartItem.type === 'regular') {
      heartItem.x = xStarting(heartItem.spriteWidth);
      heartItem.y = yStarting(heartItem.spriteHeight);
      if (player.life < player.maxLife && ((game.now - player.heartTime) / 1000) > 1) {
        player.getHeartTime();
        player.life += heartItem.points;
        if (player.life > player.maxLife) {
          player.life = player.maxLife;
        }
        updateHeartDisplay(player);
      }
    }
  }
};

export default heartCollisionDetection;
