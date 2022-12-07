import { IParticleRenderer } from './IParticleRenderer';
import { Particle } from './Particle';
import { CartesianSystemType } from '../../types/CartesianSystemType';
import { IPlainManager } from '../plain/IPlainManager';

export class ParticleRenderer implements IParticleRenderer {
	constructor(private plainManager: IPlainManager) {}

	public render = (position: CartesianSystemType, radius: number) => {
		this.plainManager.drawCircle(position, radius, Particle.PARTICLE_COLOR);
	};
}
