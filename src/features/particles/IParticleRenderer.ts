import { CartesianSystemType } from '../../types/CartesianSystemType';

export interface IParticleRenderer {
	render(particlePosition: CartesianSystemType, radius: number): void;
}
