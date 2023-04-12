class Sprite {
  constructor(config) {
    this.world = config.world;
    this.gameObject = config.gameObject;

    this.animationFramesLeft = this.world.tileSize;

    this.imageMap = config.imageMap;
    this.imageIndex = config.imageIndex;
    this.image = this.imageMap[this.imageIndex];
  }

  #getAnimationFrameOffset() {
    if (this.gameObject.isMoving) {
      switch (this.gameObject.direction) {
        case "LEFT":
          return [this.animationFramesLeft, 0];
        case "UP":
          return [0, this.animationFramesLeft];
        case "RIGHT":
          return [-this.animationFramesLeft, 0];
        case "DOWN":
          return [0, -this.animationFramesLeft];
      }
    } else {
      return [0, 0];
    }
  }

  #getDrawingCoordinates(coordinates) {
    return [
      coordinates[0] + this.world.edgeCoordinates[0],
      coordinates[1] + this.world.edgeCoordinates[1],
    ];
  }

  draw() {
    const [xObject, yObject] = this.#getDrawingCoordinates(
      this.gameObject.position
    );

    const [xGameWindowOffset, yGameWindowOffset] =
      this.world.getGameWindowOffset();

    if (this.gameObject.isMoving) {
      this.animationFramesLeft -= this.gameObject.speed;
    }

    const [xObjectMovementOffset, yObjectMovementOffset] =
      this.#getAnimationFrameOffset();

    const [xCamera, yCamera] = this.world.camera.getPosition();
    const [xCameraMovementOffset, yCameraMovementOffset] =
      this.world.camera.getCameraMovementOffset();

    this.world.context.drawImage(
      this.image,
      this.world.withTileSize(xObject) +
        xObjectMovementOffset -
        this.world.withTileSize(xCamera) -
        xCameraMovementOffset +
        xGameWindowOffset,
      this.world.withTileSize(yObject) +
        yObjectMovementOffset -
        this.world.withTileSize(yCamera) -
        yCameraMovementOffset +
        yGameWindowOffset,
      this.world.tileSize,
      this.world.tileSize
    );

    if (this.animationFramesLeft === 0) {
      this.gameObject.isMoving = false;
      this.animationFramesLeft = this.world.tileSize;
    }
  }
}
