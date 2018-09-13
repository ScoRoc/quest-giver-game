import Projectile from './Projectile.js';

class FireProjectile extends Projectile {
  constructor(source) {
    super(stats, source);
    this.name = 'fire-projectile';
  };
};

const stats = {
  img: 'images/fire-dot.png',
  xFrame: 0,
  yFrame: 0,
  pngWidth: 600,
  pngHeight: 560,
  spriteWidth: 30,
  spriteHeight: 28,
  speed: 1
};

let source = {
  x: 150,
  y: 150
};

let target = {
  x: 50,
  y: 350
};

let foo = new FireProjectile(source);
foo.active = true;
// foo.shoot(source, target);

export { FireProjectile, foo, source, target };
