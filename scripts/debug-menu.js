class DebugMenu {
  constructor(config) {
    this.world = config.world;
    this.container = config.container;

    this.wrapper = document.createElement("div");
    this.wrapper.id = "debug-menu";

    this.isHidden = true;

    this.fps = document.createElement("div");

    window.addEventListener("keydown", (event) =>
      this.#toggleVisibility(event)
    );
  }

  #toggleVisibility(event) {
    const key = event.key.toUpperCase();

    if (key === "/") {
      this.wrapper.style.visibility = this.isHidden ? "visible" : "hidden";
      this.isHidden = !this.isHidden;
    }
  }

  update(data) {
    this.fps.innerHTML = `FPS: ${data.fps}`;
  }

  render() {
    this.container.append(this.wrapper);
    this.wrapper.append(this.fps);
    this.wrapper.style.visibility = this.isHidden ? "hidden" : "visible";
  }
}
