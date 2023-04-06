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

  draw(world) {
    const [xDrawing, yDrawing] = getDrawingCoordinates(
      this.gameObject.position,
      world.edgeCoordinates
    );

    if (this.gameObject.isMoving) {
      this.animationFramesLeft -= this.gameObject.speed;
    }

    const [xOffset, yOffset] = this.getAnimationFrameOffset();

    world.context.drawImage(
      this.image,
      withTileSize(xDrawing) + xOffset,
      withTileSize(yDrawing) + yOffset
    );

    if (this.animationFramesLeft === 0) {
      this.gameObject.isMoving = false;
      this.animationFramesLeft = tileSize;
    }
  }
}
