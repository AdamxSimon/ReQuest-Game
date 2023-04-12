let characterSprites = {
  player: "../sprites/player.png",
  character: "../sprites/character.png",
};

class Character extends GameObject {
  constructor(config) {
    super({ ...config, isObstruction: true, imageMap: characterSprites });

    this.isControlled = config.isControlled || false;

    if (this.isControlled) {
      this.addControls();
    }
  }

  addControls() {
    if (!this.controls) {
      this.controls = new Controls(this);
    }
  }

  removeControls() {
    this.controls = null;
  }
}
