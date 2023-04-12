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

    if (this.focus.isMoving) {
      switch (this.focus.direction) {
        case "LEFT":
          return [this.focus.sprite.animationFramesLeft, 0];
        case "UP":
          return [0, this.focus.sprite.animationFramesLeft];
        case "RIGHT":
          return [-this.focus.sprite.animationFramesLeft, 0];
        case "DOWN":
          return [0, -this.focus.sprite.animationFramesLeft];
      }
    }

    return [0, 0];
  }

  updateFocus(focus) {
    this.focus = focus;
  }
}
