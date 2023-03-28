let world;

function loop() {
  Object.entries(world.terrainMap).forEach(([coordinatesAsString, terrain]) => {
    const coordinates = JSON.parse(coordinatesAsString);
    const edgeCoordinates = world.getEdgeCoordinates();
    const normalizedCoordinates = normalizeCoordinates(
      coordinates,
      edgeCoordinates
    );
    terrain.draw(world.context, normalizedCoordinates);
  });
  requestAnimationFrame(loop);
}

async function initialize(height, width) {
  world = new World(height, width);

  await loadTerrainSprites();
  world.initializeTerrainMap();
  world.createCanvas();

  loop();
}

initialize(5, 5);
