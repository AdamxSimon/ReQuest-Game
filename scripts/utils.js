function withTileSize(value) {
  return value * tileSize;
}

function getDrawingCoordinates(coordinates, edgeCoordinates) {
  return [
    coordinates[0] + edgeCoordinates[0],
    coordinates[1] + edgeCoordinates[1],
  ];
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
