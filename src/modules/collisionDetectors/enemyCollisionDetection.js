import { updateHeartDisplay } from '../items/hearts.js';
import { game } from '../../app.js';
import { checkForDead, updateLastEnemy } from '../battle/battleFunctions.js';

//Collision Detection between Player and enemies
let enemyCollisionDetection = function(player, baddy) {
  let x1 = player.x;
  let y1 = player.y;
  let x2 = baddy.x;
  let y2 = baddy.y;
  if (!player.isAttacking && ((game.now - player.hitTime) / 1000) > 1.25 && baddy.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - (y1 - 4);
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !player.invincible) {
      player.getDamagedTime();
      player.life -= baddy.strength;
      updateHeartDisplay(player);
    };
  } else if (player.isAttacking && ((game.now - player.attackTime) / 1000) > .2 && baddy.life > 0) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    let hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    let xRightAttack = x1 + 20;
    let xDistanceRight = x2 - xRightAttack;
    let hitRadiusRight = Math.abs(Math.sqrt(Math.pow(xDistanceRight, 2) + Math.pow(yDistance, 2)));
    let yDownAttack = y1 + 18;
    let yDistanceDown = y2 - yDownAttack;
    let hitRadiusDown = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistanceDown, 2)));
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      player.getAttackTime();
      baddy.life -= 1;
      updateLastEnemy(player, baddy);
      checkForDead(baddy);
    };
  };
};

export default enemyCollisionDetection;
