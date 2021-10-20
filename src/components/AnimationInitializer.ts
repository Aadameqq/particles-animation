import ParticlesController from "./ParticlesController";

class AnimationInitializer {
  private screenSize: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {
    this.updateScreenSize();
    this.initializeEventListeners();
    this.initializeParticlesController();
  }

  initializeEventListeners = () => {
    window.addEventListener("resize", this.updateScreenSize);
  };

  initializeParticlesController = () => {
    const particlesController = new ParticlesController(
      this.ctx,
      this.screenSize
    );
  };

  updateScreenSize = () => {
    this.screenSize = {
      x: window.innerWidth,
      y: window.innerHeight,
    };
    this.canvas.width = this.screenSize.x;
    this.canvas.height = this.screenSize.y;
  };
}

export default AnimationInitializer;
