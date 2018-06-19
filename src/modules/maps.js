//Defining backgroundMap canvas
let backgroundMap = document.getElementById('background-map');
backgroundMap.width = 512;
backgroundMap.height = 352;

let ctxBackgroundMap = backgroundMap.getContext('2d');

export { backgroundMap, ctxBackgroundMap };
