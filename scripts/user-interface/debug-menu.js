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
    if (event.key === "/") {
      this.wrapper.style.visibility = this.isHidden ? "visible" : "hidden";
      this.isHidden = !this.isHidden;
    }
  }

  update(data) {
    this.fps.textContent = `FPS: ${data.fps}`;
  }

  mount() {
    this.container.append(this.wrapper);
    this.wrapper.append(this.fps);
    this.wrapper.style.visibility = this.isHidden ? "hidden" : "visible";
  }
}
