function withTileSize(value) {
  return value * tileSize;
}

function normalizeCoordinates(coordinates, edgeCoordinates) {
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
