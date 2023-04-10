class Camera {
  constructor(focus) {
    this.focus = focus || null;
  }

  getPosition() {
    return this.focus?.position || [0, 0];
  }

  getCameraMovementOffset() {
    if (!this.focus) {
      return [0, 0];
    }

    const {
      isMoving,
      direction,
      sprite: { animationFramesLeft },
    } = this.focus;

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
    }

    return [0, 0];
  }

  updateFocus(focus) {
    this.focus = focus;
  }
}
