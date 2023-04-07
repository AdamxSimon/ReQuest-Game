class GameObject {
  constructor(config) {
    this.position = config.position;

    this.isObstruction = config.isObstruction || false;

    this.direction = "DOWN";

    this.isMoving = false;
    this.speed = config.speed || defaultSpeed;

    this.sprite = new Sprite({ ...config, gameObject: this });
  }

  move(destination) {
    this.isMoving = true;
    this.position = destination;
  }

  update(world) {
    const heldDirection = this.controls?.heldDirections[0];

    if (heldDirection && !this.isMoving) {
      this.direction = heldDirection;
      const destinationCoordinates = getNextTile(this.position, this.direction);
      const destinationTile =
        world.tiles[getCoordinatesAsIndex(destinationCoordinates)];

      if (destinationTile && !destinationTile?.character?.isObstruction) {
        const previousPosition = this.position;
        this.move(destinationCoordinates);
        world.tiles[getCoordinatesAsIndex(previousPosition)].character = null;
        world.tiles[getCoordinatesAsIndex(destinationCoordinates)].character =
          this;
      }
    }
  }

  render(world) {
    this.sprite.draw(world);
  }
}
