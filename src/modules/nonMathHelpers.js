let newImage = src => {
  let img = new Image();
  img.src = src;
  return img;
};

export { newImage };
