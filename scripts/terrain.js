let terrainSprites = { grass: "../sprites/grass.png" };

class Terrain extends GameObject {
  constructor(config) {
    super({ ...config, imageMap: terrainSprites });
  }
}
