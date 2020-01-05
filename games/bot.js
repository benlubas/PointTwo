const genPath = (width, height) => {
  let path = [];
  for (let x = 0; x < width; x++) {
    if (x % 2 == 0) {
      for (let y = 1; y < height; y++) {
        path.push(new Point(x, y));
      }
    } else {
      for (let y = height - 1; y >= 1; y--) {
        path.push(new Point(x, y));
      }
    }
  }
  for (let i = width - 1; i >= 0; i--) {
    path.push(new Point(i, 0));
  }
  console.log(path);
  return path;
};
const makeAMove = (head, path) => {
  const position = path.includesPoint(head);
  const next = path[(position + 1) % path.length];
  if (head.x === next.x) {
    if (head.y > next.y) {
      return new Point(0, -1);
    } else {
      return new Point(0, 1);
    }
  } else {
    if (head.x < next.x) {
      return new Point(1, 0);
    } else {
      return new Point(-1, 0);
    }
  }
};
