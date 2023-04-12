class LoadingScreen {
  constructor(container) {
    this.container = container;
  }

  unmount() {
    this.wrapper.remove();
  }

  mount(text) {
    this.wrapper = document.createElement("div");
    this.wrapper.id = "loading-screen";

    this.wrapper.textContent = text;
    this.container.append(this.wrapper);
  }
}
