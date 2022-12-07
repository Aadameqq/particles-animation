import { ParticleRenderer } from './ParticleRenderer';
import { Particle } from './Particle';
import { randomValue } from '../../utils/randomValue';
import { randomPosition } from '../../utils/randomPosition';
import { IPlainManager } from '../plain/IPlainManager';
import { CartesianSystemType } from '../../types/CartesianSystemType';
import { IParticleFactory } from './IParticleFactory';
import { IPlainSize } from '../plain/IPlainSize';

export class ParticleFactory implements IParticleFactory {
	constructor(
		private plainManager: IPlainManager,
		private plainSize: IPlainSize
	) {}

	public create = (
		position: CartesianSystemType = randomPosition(
			this.plainSize.getWidth(),
			this.plainSize.getHeight()
		)
	) => {
		const particleRenderer = new ParticleRenderer(this.plainManager);

		const MIN_ANGLE = 0;
		const MAX_ANGLE = 360;
		const angle = randomValue(MIN_ANGLE, MAX_ANGLE);

		const MIN_SIZE = 2;
		const MAX_SIZE = 5;
		const radius = randomValue(MIN_SIZE, MAX_SIZE);

		return new Particle(
			this.plainSize,
			particleRenderer,
			position,
			angle,
			radius
		);
	};
}
