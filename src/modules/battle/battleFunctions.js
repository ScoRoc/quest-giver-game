import { enemyDies } from './enemyDies.js';

let checkForDead = baddy => {
  if (baddy.life <= 0) {
    baddy.dead = true;
    enemyDies(baddy);
  }
};

let updateLastEnemy = (player, baddy) => {
  player.lastAttacked = baddy;
  $('#last-enemy-class').text(baddy.class);
  $('#last-enemy-img').attr('src', baddy.image.src);
  $('#last-enemy-life').text(baddy.life);
  $('#last-enemy-max-life').text(baddy.maxLife);
};

let updateDebuff = debuff => {
  if (debuff.isAttacking) {
    $('#debuff-name').text(debuff.type);
    $('#debuff-img').attr('src', debuff.image.src);
    $('#debuff-desc').text(debuff.desc);
  } else {
    $('#debuff-name').text('No debuffs');
    $('#debuff-img').attr('src', '');
    $('#debuff-desc').text('');
  }
};

export { checkForDead, updateLastEnemy, updateDebuff };
