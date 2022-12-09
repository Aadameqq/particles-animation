import { ParticleRenderer } from './ParticleRenderer';
import { Particle } from './Particle';
import { randomValue } from '../../utils/randomValue';
import { randomPosition } from '../../utils/randomPosition';
import { IPlainManager, IPlainSize } from '../plain';
import { IParticleFactory } from './IParticleFactory';

export class ParticleFactory implements IParticleFactory {
	private readonly particleRenderer: ParticleRenderer;

	constructor(
		private plainManager: IPlainManager,
		private plainSize: IPlainSize
	) {
		this.particleRenderer = new ParticleRenderer(plainManager);
	}

	public create = (
		position = randomPosition(
			this.plainSize.getWidth(),
			this.plainSize.getHeight()
		)
	) => {
		const MIN_ANGLE = 0;
		const MAX_ANGLE = 360;
		const angle = randomValue(MIN_ANGLE, MAX_ANGLE);

		const MIN_SIZE = 1.5;
		const MAX_SIZE = 4;
		const radius = randomValue(MIN_SIZE, MAX_SIZE);

		return new Particle(
			this.plainSize,
			this.particleRenderer,
			position,
			angle,
			radius
		);
	};
}
