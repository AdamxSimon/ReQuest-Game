class GameObject {
  constructor(config) {
    this.world = config.world;

    this.position = config.position;

    this.isObstruction = config.isObstruction || false;

    this.direction = "DOWN";

    this.isMoving = false;
    this.speed = config.speed || 1;

    this.sprite = new Sprite({ ...config, gameObject: this });
  }

  move(destination) {
    this.isMoving = true;
    this.position = destination;
  }

  update() {
    if (this.controls?.heldDirections.length && !this.isMoving) {
      this.direction = this.controls.heldDirections[0];
      const destinationCoordinates = getNextTile(this.position, this.direction);
      const destinationTile =
        this.world.tiles[getCoordinatesAsString(destinationCoordinates)];

      if (destinationTile && !destinationTile?.character?.isObstruction) {
        const previousPosition = this.position;
        this.move(destinationCoordinates);
        this.world.tiles[getCoordinatesAsString(previousPosition)].character =
          null;
        this.world.tiles[
          getCoordinatesAsString(destinationCoordinates)
        ].character = this;
      }
    }
  }

  render() {
    this.sprite.draw();
  }
}
