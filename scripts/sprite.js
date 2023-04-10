class Sprite {
  constructor(config) {
    this.gameObject = config.gameObject;

    this.animationFramesLeft = tileSize;

    this.imageMap = config.imageMap;
    this.imageIndex = config.imageIndex;
    this.image = this.imageMap[this.imageIndex];
  }

  getAnimationFrameOffset() {
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

  getCameraMovementOffset(cameraFocus) {
    const {
      isMoving,
      direction,
      sprite: { animationFramesLeft },
    } = cameraFocus;

    if (isMoving) {
      switch (direction) {
        case "LEFT":
          return [animationFramesLeft, 0];
        case "UP":
          return [0, animationFramesLeft];
        case "RIGHT":
          return [-animationFramesLeft, 0];
        case "DOWN":
          return [0, -animationFramesLeft];
      }
    } else {
      return [0, 0];
    }
  }

  #getDrawingCoordinates(coordinates, edgeCoordinates) {
    return [
      coordinates[0] + edgeCoordinates[0],
      coordinates[1] + edgeCoordinates[1],
    ];
  }

  draw(world) {
    const [xObject, yObject] = this.#getDrawingCoordinates(
      this.gameObject.position,
      world.edgeCoordinates
    );

    const [xGameWindowOffset, yGameWindowOffset] = world.getGameWindowOffset();

    if (this.gameObject.isMoving) {
      this.animationFramesLeft -= this.gameObject.speed;
    }

    const [xObjectMovementOffset, yObjectMovementOffset] =
      this.getAnimationFrameOffset();

    const [xCamera, yCamera] = world.camera.getPosition();
    const [xCameraMovementOffset, yCameraMovementOffset] =
      world.camera.getCameraMovementOffset();

    world.context.drawImage(
      this.image,
      withTileSize(xObject) +
        xObjectMovementOffset -
        withTileSize(xCamera) -
        xCameraMovementOffset +
        xGameWindowOffset,
      withTileSize(yObject) +
        yObjectMovementOffset -
        withTileSize(yCamera) -
        yCameraMovementOffset +
        yGameWindowOffset
    );

    if (this.animationFramesLeft === 0) {
      this.gameObject.isMoving = false;
      this.animationFramesLeft = tileSize;
    }
  }
}
