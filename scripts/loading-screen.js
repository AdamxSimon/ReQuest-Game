class LoadingScreen {
  constructor(config) {
    this.container = config.container;

    this.wrapper = document.createElement("div");
    this.wrapper.id = "loading-screen";
  }

  unmount() {
    this.wrapper.remove();
  }

  initialize(text) {
    this.wrapper.textContent = text;
    this.container.append(this.wrapper);
  }
}
