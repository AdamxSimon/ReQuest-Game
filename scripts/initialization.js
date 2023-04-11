const gameWindow = document.getElementById("game-window");

const worldConfig = { height: 999, width: 999, gameWindow };

window.onload = () => {
  world = new World(worldConfig);
  world.initialize();
};
