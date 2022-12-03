import { ParticleRenderer } from "./ParticleRenderer";
import Particle from "./Particle";
import CartesianSystemType from "../types/CartesianSystemType";
import { PlainManager } from "./PlainManager";

export class ParticleRendererImplementation implements ParticleRenderer {
  constructor(private plainManager: PlainManager) {}

  public render(particlePosition: CartesianSystemType, radius: number) {
    this.plainManager.drawCircle(
      particlePosition,
      radius,
      Particle.PARTICLE_COLOR
    );
  }
}
