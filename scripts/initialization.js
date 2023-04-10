const gameWindow = document.getElementById("game-window");

const worldConfig = { height: 999, width: 999, gameWindow };

world = new World(worldConfig);
world.initialize();
