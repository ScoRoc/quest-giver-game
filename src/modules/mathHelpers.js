//Random Number Generators
var coinFlip = function(num) {
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
var xStarting = function(spriteWidth) {
  return Math.floor(Math.random() * (510 - spriteWidth));
};
var yStarting = function(spriteHeight) {
  return Math.floor(Math.random() * (350 - spriteHeight));
};

export { coinFlip, xStarting, yStarting };
