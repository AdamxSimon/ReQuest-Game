function initialize(worldHeight, worldWidth) {
  const canvas = document.createElement("canvas");

  canvas.height = withTileSize(worldHeight);
  canvas.width = withTileSize(worldWidth);

  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.appendChild(canvas);
}

initialize(2, 2);
