let world;

function initialize(height, width) {
  world = new World(height, width);
  world.initialize();
}

initialize(5, 5);
