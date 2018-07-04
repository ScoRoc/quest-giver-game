
import { xStarting, yStarting } from './mathHelpers.js';

let xRightResetOffscreenEnemies = function (enemy) {
  enemy.x = -100;
  enemy.y = yStarting(enemy.spriteHeight);
};

//rest xLeftRunner offscreen enemies
let xLeftResetOffscreenEnemies = function (enemy) {
  enemy.x = 555;
  enemy.y = yStarting(enemy.spriteHeight);
};

//rest y offscreen enemies
let yResetOffscreenEnemies = function (enemy) {
  enemy.x = xStarting(enemy.spriteWidth);
  enemy.y = -60;
};

export { xRightResetOffscreenEnemies, xLeftResetOffscreenEnemies, yResetOffscreenEnemies };
