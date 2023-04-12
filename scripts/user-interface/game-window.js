class GameWindow {
  constructor(container) {
    this.container = container;

    this.wrapper = document.createElement("div");
    this.wrapper.id = "game-window";

    this.world = null;

    this.loadingScreen = this.loadingScreen = new LoadingScreen(this.wrapper);
    this.debugMenu = null;

    this.container.append(this.wrapper);
  }

  loadWorld(config) {
    this.world = new World({ ...config, gameWindow: this });
    this.debugMenu = new DebugMenu({
      world: this.world,
      container: this.wrapper,
    });
    this.world.initialize();
  }
}
