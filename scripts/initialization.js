let world;

async function initialize(height, width) {
  world = new World(height, width);

  await loadSprites(terrainSprites);
  await loadSprites(characterSprites);

  world.initializeTerrain();
  world.initializePlayer();
  world.initializeCanvas();

  world.play();
}

initialize(5, 5);
