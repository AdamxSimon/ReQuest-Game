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

  draw(world) {
    const [xObject, yObject] = getDrawingCoordinates(
      this.gameObject.position,
      world.edgeCoordinates
    );

    if (this.gameObject.isMoving) {
      this.animationFramesLeft -= this.gameObject.speed;
    }

    const [xObjectMovementOffset, yObjectMovementOffset] =
      this.getAnimationFrameOffset();

    const [xCamera, yCamera] = world.cameraFocus.position;
    const [xCameraMovementOffset, yCameraMovementOffset] =
      this.getCameraMovementOffset(world.cameraFocus);

    world.context.drawImage(
      this.image,
      withTileSize(xObject) +
        xObjectMovementOffset -
        withTileSize(xCamera) -
        xCameraMovementOffset,
      withTileSize(yObject) +
        yObjectMovementOffset -
        withTileSize(yCamera) -
        yCameraMovementOffset
    );

    if (this.animationFramesLeft === 0) {
      this.gameObject.isMoving = false;
      this.animationFramesLeft = tileSize;
    }
  }
}
