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

    this.tiles = {};

    this.renderDistance = 4;
  }

  initializeTiles() {
    for (let y = -this.edgeCoordinates[1]; y <= this.edgeCoordinates[1]; y++) {
      for (
        let x = -this.edgeCoordinates[0];
        x <= this.edgeCoordinates[0];
        x++
      ) {
        this.tiles[getCoordinatesAsIndex([x, y])] = new Tile();
      }
    }
  }

  initializeTerrain() {
    for (let y = -this.edgeCoordinates[1]; y <= this.edgeCoordinates[1]; y++) {
      for (
        let x = -this.edgeCoordinates[0];
        x <= this.edgeCoordinates[0];
        x++
      ) {
        this.tiles[getCoordinatesAsIndex([x, y])].terrain = new Terrain({
          position: [x, y],
          imageIndex: "grass",
        });
      }
    }
  }

  initializeCharacters() {
    const initialPlayer = new Character({
      position: [0, 0],
      speed: 2,
      isControlled: true,
      imageIndex: "player",
    });
    const testCharacter = new Character({
      position: [1, 0],
      imageIndex: "character",
    });

    this.tiles[getCoordinatesAsIndex([0, 0])].character = initialPlayer;
    this.tiles[getCoordinatesAsIndex([1, 0])].character = testCharacter;

    this.cameraFocus = initialPlayer;
  }

  initializeCanvas() {
    const canvasContainer = document.getElementById("canvas-container");

    this.canvas.height = canvasContainer.clientHeight;
    this.canvas.width = canvasContainer.clientWidth;

    canvasContainer.appendChild(this.canvas);
  }

  async initialize() {
    await loadSprites(terrainSprites);
    await loadSprites(characterSprites);

    this.initializeTiles();
    this.initializeTerrain();
    this.initializeCharacters();
    this.initializeCanvas();

    this.play();
  }

  #getCoordinatesToRender() {
    const tilesToRender = [];
    for (
      let y = Math.min(
        this.cameraFocus.position[1] + this.renderDistance,
        this.edgeCoordinates[1]
      );
      y >=
      Math.max(
        this.cameraFocus.position[1] - this.renderDistance,
        -this.edgeCoordinates[1]
      );
      y--
    ) {
      for (
        let x = Math.max(
          this.cameraFocus.position[0] - this.renderDistance,
          -this.edgeCoordinates[0]
        );
        x <=
        Math.min(
          this.cameraFocus.position[0] + this.renderDistance,
          this.edgeCoordinates[0]
        );
        x++
      ) {
        tilesToRender.push(getCoordinatesAsIndex([x, y]));
      }
    }
    return tilesToRender;
  }

  play() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const coordinatesToRender = this.#getCoordinatesToRender();

    const characters = [];

    coordinatesToRender.forEach((coordinate) => {
      this.tiles[coordinate].terrain.update(this);
      this.tiles[coordinate].terrain.render(this);

      if (this.tiles[coordinate].character) {
        characters.push(this.tiles[coordinate].character);
      }
    });

    characters.forEach((character) => {
      character.update(this);
      character.render(this);
    });

    requestAnimationFrame(() => this.play());
  }
}
