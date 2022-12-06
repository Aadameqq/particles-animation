import { ParticleRendererImplementation } from './ParticleRendererImplementation';
import { Particle } from './Particle';
import { randomValue } from '../utils/randomValue';
import { randomPosition } from '../utils/randomPosition';
import { PlainManager } from './PlainManager';
import { PlainSize } from './PlainSize';
import { CartesianSystemType } from '../types/CartesianSystemType';

export class ParticleFactory {
	constructor(
		private plainManager: PlainManager,
		private plainSize: PlainSize
	) {}

	public create = (
		position: CartesianSystemType = randomPosition(
			this.plainSize.getSize().width,
			this.plainSize.getSize().height
		)
	) => {
		const particleRenderer = new ParticleRendererImplementation(
			this.plainManager
		);

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
