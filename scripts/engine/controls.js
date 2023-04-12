class Controls {
  constructor(config) {
    this.character = config.character;

    this.heldDirections = [];

    this.#addKeyListeners();
  }

  #addKeyListeners() {
    window.onkeydown = (event) => {
      const key = event.key.toUpperCase();
      switch (key) {
        case "ARROWLEFT":
        case "A":
          if (!this.heldDirections.includes("LEFT")) {
            this.heldDirections.unshift("LEFT");
          }
          break;
        case "ARROWUP":
        case "W":
          if (!this.heldDirections.includes("UP")) {
            this.heldDirections.unshift("UP");
          }
          break;
        case "ARROWRIGHT":
        case "D":
          if (!this.heldDirections.includes("RIGHT")) {
            this.heldDirections.unshift("RIGHT");
          }
          break;
        case "ARROWDOWN":
        case "S":
          if (!this.heldDirections.includes("DOWN")) {
            this.heldDirections.unshift("DOWN");
          }
          break;
      }
    };

    window.onkeyup = (event) => {
      const key = event.key.toUpperCase();
      let indexToRemove;
      switch (key) {
        case "ARROWLEFT":
        case "A":
          indexToRemove = this.heldDirections.indexOf("LEFT");
          if (indexToRemove !== -1) {
            this.heldDirections.splice(indexToRemove, 1);
          }
          break;
        case "ARROWUP":
        case "W":
          indexToRemove = this.heldDirections.indexOf("UP");
          if (indexToRemove !== -1) {
            this.heldDirections.splice(indexToRemove, 1);
          }
          break;
        case "ARROWRIGHT":
        case "D":
          indexToRemove = this.heldDirections.indexOf("RIGHT");
          if (indexToRemove !== -1) {
            this.heldDirections.splice(indexToRemove, 1);
          }
          break;
        case "ARROWDOWN":
        case "S":
          indexToRemove = this.heldDirections.indexOf("DOWN");
          if (indexToRemove !== -1) {
            this.heldDirections.splice(indexToRemove, 1);
          }
          break;
      }
    };
  }
}
