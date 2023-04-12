class World {
  constructor(config) {
    this.height = config.height;
    this.width = config.width;

    this.tileSize = 64;

    this.edgeCoordinates = [
      Math.floor(this.width / 2),
      Math.floor(this.height / 2),
    ];

    this.gameWindow = config.gameWindow;

    this.loadingScreen = new LoadingScreen({ container: this.gameWindow });

    this.debugMenu = new DebugMenu({ world: this, container: this.gameWindow });

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.isLoading = true;

    this.tiles = {};

    this.camera = new Camera();

    this.renderDistance = 50;

    this.lastThirtyFrames = [];
    this.frameRateCounter = 0;
  }

  async #initializeTiles() {
    await new Promise((resolve) => {
      for (
        let y = -this.edgeCoordinates[1];
        y <= this.edgeCoordinates[1];
        y++
      ) {
        for (
          let x = -this.edgeCoordinates[0];
          x <= this.edgeCoordinates[0];
          x++
        ) {
          this.tiles[getCoordinatesAsString([x, y])] = new Tile();
        }
      }
      resolve();
    });
  }

  async #initializeTerrain() {
    await new Promise((resolve) => {
      for (
        let y = -this.edgeCoordinates[1];
        y <= this.edgeCoordinates[1];
        y++
      ) {
        for (
          let x = -this.edgeCoordinates[0];
          x <= this.edgeCoordinates[0];
          x++
        ) {
          this.tiles[getCoordinatesAsString([x, y])].terrain = new Terrain({
            world: this,
            position: [x, y],
            imageIndex: "grass",
          });
        }
      }
      resolve();
    });
  }

  async #initializeCharacters() {
    await new Promise((resolve) => {
      const initialPlayer = new Character({
        world: this,
        position: [0, 0],
        speed: 2,
        isControlled: true,
        imageIndex: "player",
      });
      const testCharacter = new Character({
        world: this,
        position: [1, 0],
        imageIndex: "character",
      });

      this.tiles[getCoordinatesAsString([0, 0])].character = initialPlayer;
      this.tiles[getCoordinatesAsString([1, 0])].character = testCharacter;

      this.camera.updateFocus(initialPlayer);
      resolve();
    });
  }

  async #initializeCanvas() {
    await new Promise((resolve) => {
      this.canvas.height = this.gameWindow.clientHeight;
      this.canvas.width = this.gameWindow.clientWidth;

      window.addEventListener("resize", () => {
        this.canvas.height = this.gameWindow.clientHeight;
        this.canvas.width = this.gameWindow.clientWidth;
      });

      this.gameWindow.append(this.canvas);
      resolve();
    });
  }

  async initialize() {
    this.loadingScreen.initialize("Loading...");

    await loadSprites(terrainSprites);
    await loadSprites(characterSprites);

    await this.#initializeTiles();
    await this.#initializeTerrain();
    await this.#initializeCharacters();
    await this.#initializeCanvas();

    this.debugMenu.render();

    this.play();

    this.loadingScreen.unmount();
  }

  withTileSize(number) {
    return number * this.tileSize;
  }

  getGameWindowOffset() {
    return [
      Math.floor(this.canvas.width / 2) -
        Math.floor(this.withTileSize(this.width) / 2),
      Math.floor(this.canvas.height / 2) -
        Math.floor(this.withTileSize(this.height) / 2),
    ];
  }

  #getCoordinatesToRender() {
    const coordinatesToRender = [];
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
        coordinatesToRender.push(getCoordinatesAsString([x, y]));
      }
    }
    return coordinatesToRender;
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
        this.withTileSize(this.renderDistance + 1) -
        Math.floor(this.tileSize / 2),
      Math.floor(this.canvas.height / 2) -
        this.withTileSize(this.renderDistance + 1) -
        Math.floor(this.tileSize / 2),
      Math.floor(this.canvas.width / 2) +
        this.withTileSize(this.renderDistance + 1) +
        Math.floor(this.tileSize / 2),
      Math.floor(this.canvas.height / 2) +
        this.withTileSize(this.renderDistance) +
        Math.floor(this.tileSize / 2)
    );

    const coordinatesToRender = this.#getCoordinatesToRender();

    const charactersToRender = [];

    coordinatesToRender.forEach((coordinate) => {
      this.tiles[coordinate].terrain.update();
      this.tiles[coordinate].terrain.render();

      if (this.tiles[coordinate].character) {
        charactersToRender.push(this.tiles[coordinate].character);
      }
    });

    charactersToRender.forEach((character) => {
      character.update();
      character.render();
    });

    requestAnimationFrame(() => this.play());
  }
}
