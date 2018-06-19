//Random Number Generators
let coinFlip = function(num) {
  switch (Math.floor(Math.random() * num)) {
    case 0:
      return 0;
      break;
    case 1:
      return 1;
      break;
    case 2:
      return 2;
      break;
    case 3:
      return 3;
      break;
  }
};

//Random starting x and y points
let xStarting = function(spriteWidth) {
  return Math.floor(Math.random() * (510 - spriteWidth));
};
let yStarting = function(spriteHeight) {
  return Math.floor(Math.random() * (350 - spriteHeight));
};

//Random starting x and y points for map
let xMapStart = function(spriteWidth) {
  return (Math.floor(Math.random() * 16)) * 256;
};
let yMapStart = function(spriteHeight) {
  return (Math.floor(Math.random() * 8)) * 176;
};

export { coinFlip, xStarting, yStarting, xMapStart, yMapStart };
