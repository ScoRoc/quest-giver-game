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
  x: 350,
  y: 250,
  spriteWidth: 30,
  spriteHeight: 28,
  speed: .018
};

let source = {
  x: 350,
  y: 250
};

let target = {
  x: 400,
  y: 300
};

let foo = new FireProjectile(stats, source);
foo.active = true;
// foo.shoot(source, target);

export { FireProjectile, foo, source, target };
