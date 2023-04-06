class World {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.edgeCoordinates = [
      Math.floor(this.width / 2),
      Math.floor(this.height / 2),
    ];

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.terrain = [];
    this.characters = [];
  }

  initializeTerrain() {
    for (let y = -this.edgeCoordinates[1]; y <= this.edgeCoordinates[1]; y++) {
      for (
        let x = -this.edgeCoordinates[0];
        x <= this.edgeCoordinates[0];
        x++
      ) {
        this.terrain.push(
          new Terrain({
            position: [x, y],
            imageIndex: "grass",
          })
        );
      }
    }
  }

  initializePlayer(coordinates = [0, 0]) {
    const [x, y] = coordinates;
    this.characters.push(
      new Character({
        position: [x, y],
        speed: 2,
        isControlled: true,
        imageIndex: "player",
      })
    );
  }

  initializeCanvas() {
    this.canvas.height = withTileSize(this.height);
    this.canvas.width = withTileSize(this.width);

    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.appendChild(this.canvas);
  }

  play() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.terrain.forEach((terrain) => {
      terrain.update();
      terrain.render(this);
    });

    this.characters.forEach((character) => {
      character.update();
      character.render(this);
    });

    requestAnimationFrame(() => this.play());
  }
}
