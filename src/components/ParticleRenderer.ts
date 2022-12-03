import CartesianSystemType from "../types/CartesianSystemType";

export interface ParticleRenderer {
  render(particlePosition: CartesianSystemType, radius: number): void;
}
