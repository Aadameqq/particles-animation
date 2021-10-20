import CartesianSystemType from "../types/CartesianSystemType";
import ConnectionsDrawer from "./ConnectionsDrawer";
import Particle from "./Particle";
import randomValue from "../utils/randomValue";

class ParticlesController {
  private PARTICLES_NUMBER = 100;

  private particlesList: Particle[] = [];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private screenSize: CartesianSystemType
  ) {
    this.initializeDefaultParticles();
    this.initializeEvents();
    this.onUpdate();
  }

  private initializeDefaultParticles = () => {
    for (let i = 0; i < this.PARTICLES_NUMBER; i++) {
      this.create();
    }
  };

  private create = (position?: CartesianSystemType) => {
    const particle = new Particle(this.ctx, this.screenSize, position);

    this.particlesList.push(particle);
  };

  private onUpdate = () => {
    this.clearCanvas();
    this.executeParticlesUpdateHandlers();
    this.drawParticlesConnections();
    requestAnimationFrame(this.onUpdate);
  };

  private clearCanvas = () =>
    this.ctx!.clearRect(0, 0, this.screenSize.x, this.screenSize.y);

  private executeParticlesUpdateHandlers = () => {
    this.particlesList.map((particle) => {
      particle.onUpdate();
      this.removeParticleOnExitCanvasIfShould(particle);
    });
  };

  private drawParticlesConnections = () => {
    const connectionsDrawer = new ConnectionsDrawer(this.ctx);
    connectionsDrawer.drawParticlesConnections(this.particlesList);
  };

  private initializeEvents = () => {
    document.addEventListener("click", this.handleClickEvent);
  };

  private handleClickEvent = ({ clientX, clientY }) => {
    this.create({ x: clientX, y: clientY });

    this.markRandomParticleAsShouldBeRemoved();
  };

  removeParticleOnExitCanvasIfShould = (particle: Particle) => {
    if (
      particle.isTooFarTheCanvas() &&
      particle.shouldBeRemovedWhenExitCanvas
    ) {
      this.particlesList = this.particlesList.filter((x) => x !== particle);
    }
  };

  markRandomParticleAsShouldBeRemoved = () => {
    const notMarkedParticles = this.particlesList.filter(
      (particle) => particle.shouldBeRemovedWhenExitCanvas === false
    );
    const randomIndex = randomValue(0, notMarkedParticles.length - 1);

    const randomParticle = notMarkedParticles[randomIndex];

    randomParticle.shouldBeRemovedWhenExitCanvas = true;
  };
}

export default ParticlesController;
