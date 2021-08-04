const generatePhotos = () => {
  const res = [];

  for (let i = 0; i < 10; i++) {
    res.push({ src: `http://picsum.photos/248/152?r=${Math.random()}` });
  }
  return res;
};

export { generatePhotos };
