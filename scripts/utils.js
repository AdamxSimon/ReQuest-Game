function getAverage(numbers) {
  const sum = numbers.reduce((total, current) => total + current, 0);
  return Math.floor(sum / numbers.length);
}

function withTileSize(value) {
  return value * tileSize;
}

function getCoordinatesAsIndex(coordinates) {
  const [x, y] = coordinates;
  return `[${x}, ${y}]`;
}

function getNextTile(coordinates, direction) {
  const [x, y] = coordinates;
  switch (direction) {
    case "LEFT":
      return [x - 1, y];
    case "UP":
      return [x, y - 1];
    case "RIGHT":
      return [x + 1, y];
    case "DOWN":
      return [x, y + 1];
  }
}

async function loadSprite(type, src) {
  return new Promise((resolve, reject) => {
    const sprite = new Image();
    sprite.src = src;

    sprite.onload = () => {
      resolve([type, sprite]);
    };

    sprite.onerror = () => {
      reject();
    };
  });
}

async function loadSprites(map) {
  const spritePairs = await Promise.all(
    Object.entries(map).map(([type, src]) => loadSprite(type, src))
  );

  spritePairs.forEach(([type, sprite]) => {
    map[type] = sprite;
  });
}
