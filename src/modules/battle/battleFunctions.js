import { enemyDies } from './enemyDies.js';

let checkForDead = (baddy) => {
  if (baddy.life <= 0) {
    baddy.dead = true;
    enemyDies(baddy);
  }
};

export { checkForDead };
