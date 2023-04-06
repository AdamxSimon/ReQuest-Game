class GameObject {
  constructor(config) {
    this.position = config.position;

    this.direction = "DOWN";

    this.isMoving = false;
    this.speed = config.speed || defaultSpeed;

    this.sprite = new Sprite({ ...config, gameObject: this });
  }

  update() {
    const [x, y] = this.position;
    const direction = this.controls?.heldDirections[0];
    if (direction && !this.isMoving) {
      this.direction = direction;
      this.isMoving = true;
      switch (direction) {
        case "LEFT":
          this.position = [x - 1, y];
          break;
        case "UP":
          this.position = [x, y - 1];
          break;
        case "RIGHT":
          this.position = [x + 1, y];
          break;
        case "DOWN":
          this.position = [x, y + 1];
          break;
      }
    }
  }

  render(world) {
    this.sprite.draw(world);
  }
}
