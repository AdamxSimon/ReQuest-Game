class World {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.terrainMap = {};
  }

  getEdgeCoordinates() {
    return [Math.floor(this.width / 2), Math.floor(this.height / 2)];
  }

  initializeTerrainMap() {
    const edgeCoordinates = this.getEdgeCoordinates();

    for (let y = -edgeCoordinates[1]; y <= edgeCoordinates[1]; y++) {
      for (let x = -edgeCoordinates[0]; x <= edgeCoordinates[0]; x++) {
        this.terrainMap[`[${x}, ${y}]`] = new Terrain("grass");
      }
    }
  }

  createCanvas() {
    this.canvas.height = withTileSize(this.height);
    this.canvas.width = withTileSize(this.width);

    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.appendChild(this.canvas);
  }
}
