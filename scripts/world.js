class World {
  constructor(config) {
    this.height = config.height;
    this.width = config.width;

    this.edgeCoordinates = [
      Math.floor(this.width / 2),
      Math.floor(this.height / 2),
    ];

    this.gameWindow = config.gameWindow;
    this.debugMenu = new DebugMenu({ world: this, container: this.gameWindow });

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.isLoading = true;

    this.tiles = {};

    this.camera = new Camera();

    this.renderDistance = 20;

    this.lastThirtyFrames = [];
    this.frameRateCounter = 0;
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

    this.camera.updateFocus(initialPlayer);
  }

  initializeCanvas() {
    this.canvas.height = this.gameWindow.clientHeight;
    this.canvas.width = this.gameWindow.clientWidth;

    window.addEventListener("resize", () => {
      this.canvas.height = this.gameWindow.clientHeight;
      this.canvas.width = this.gameWindow.clientWidth;
    });

    this.gameWindow.innerText = "";

    this.gameWindow.appendChild(this.canvas);
  }

  async initialize() {
    this.gameWindow.textContent = "Loading...";

    await loadSprites(terrainSprites);
    await loadSprites(characterSprites);

    this.initializeTiles();
    this.initializeTerrain();
    this.initializeCharacters();
    this.initializeCanvas();

    this.debugMenu.render();

    this.play();
  }

  getGameWindowOffset() {
    return [
      Math.floor(this.canvas.width / 2) -
        Math.floor(withTileSize(this.width) / 2),
      Math.floor(this.canvas.height / 2) -
        Math.floor(withTileSize(this.height) / 2),
    ];
  }

  #getCoordinatesToRender() {
    const tilesToRender = [];
    const [xCamera, yCamera] = this.camera.getPosition();
    for (
      let y = Math.min(yCamera + this.renderDistance, this.edgeCoordinates[1]);
      y >= Math.max(yCamera - this.renderDistance, -this.edgeCoordinates[1]);
      y--
    ) {
      for (
        let x = Math.max(
          xCamera - this.renderDistance,
          -this.edgeCoordinates[0]
        );
        x <= Math.min(xCamera + this.renderDistance, this.edgeCoordinates[0]);
        x++
      ) {
        tilesToRender.push(getCoordinatesAsIndex([x, y]));
      }
    }
    return tilesToRender;
  }

  play() {
    const frameDifferenceInMS = this.lastFrame
      ? performance.now() - this.lastFrame
      : 0;

    this.lastFrame = performance.now();

    const fps = Math.floor(1000 / frameDifferenceInMS);

    if (this.frameRateCounter !== 30) {
      this.lastThirtyFrames[this.frameRateCounter] = fps;
      this.frameRateCounter += 1;
    } else {
      this.debugMenu.update({ fps: getAverage(this.lastThirtyFrames) });
      this.frameRateCounter = 0;
    }

    this.context.clearRect(
      Math.floor(this.canvas.width / 2) -
        withTileSize(this.renderDistance + 1) -
        Math.floor(tileSize / 2),
      Math.floor(this.canvas.height / 2) -
        withTileSize(this.renderDistance + 1) -
        Math.floor(tileSize / 2),
      Math.floor(this.canvas.width / 2) +
        withTileSize(this.renderDistance + 1) +
        Math.floor(tileSize / 2),
      Math.floor(this.canvas.height / 2) +
        withTileSize(this.renderDistance) +
        Math.floor(tileSize / 2)
    );

    const coordinatesToRender = this.#getCoordinatesToRender();

    const charactersToRender = [];

    coordinatesToRender.forEach((coordinate) => {
      this.tiles[coordinate].terrain.update(this);
      this.tiles[coordinate].terrain.render(this);

      if (this.tiles[coordinate].character) {
        charactersToRender.push(this.tiles[coordinate].character);
      }
    });

    charactersToRender.forEach((character) => {
      character.update(this);
      character.render(this);
    });

    requestAnimationFrame(() => this.play());
  }
}
