let terrainSpriteMap = { grass: "../sprites/grass.png" };

async function loadTerrainSprites() {
  const spritePairs = await Promise.all(
    Object.entries(terrainSpriteMap).map(([type, src]) => loadSprite(type, src))
  );

  spritePairs.forEach(([type, sprite]) => {
    terrainSpriteMap[type] = sprite;
  });
}

class Terrain {
  constructor(type) {
    this.type = type;
    this.sprite = terrainSpriteMap[type];
  }

  draw(context, normalizedCoordinates) {
    const [x, y] = normalizedCoordinates;
    context.drawImage(this.sprite, withTileSize(x), withTileSize(y));
  }
}
