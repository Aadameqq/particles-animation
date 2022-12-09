import { IParticleRenderer } from './IParticleRenderer';
import { Particle } from './Particle';
import { IPlainManager } from '../plain/IPlainManager';
import { Position } from '../../utils/Position';

export class ParticleRenderer implements IParticleRenderer {
	constructor(private plainManager: IPlainManager) {}

	public render = (position: Position, radius: number) => {
		this.plainManager.drawCircle(position, radius, Particle.PARTICLE_COLOR);
	};
}
