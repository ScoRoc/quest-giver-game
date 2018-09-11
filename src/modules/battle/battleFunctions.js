import { enemyDies } from './enemyDies.js';

let checkForDead = baddy => {
  if (baddy.life <= 0) {
    baddy.dead = true;
    enemyDies(baddy);
  }
};

let updateLastEnemy = (player, baddy) => {
  player.lastAttacked = baddy;
  console.log('heres baddy: ', baddy);
  $('#last-enemy-class').text(baddy.class);
  $('#last-enemy-img').attr('src', baddy.image.src);
  $('#last-enemy-life').text(baddy.life);
  $('#last-enemy-max-life').text(baddy.maxLife);
};

export { checkForDead, updateLastEnemy };
