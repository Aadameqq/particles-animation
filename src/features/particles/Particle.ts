import { IParticleRenderer } from './IParticleRenderer';
import { IPlainSize } from '../plain';
import { Position } from '../../utils/Position';

export class Particle {
	public static readonly PARTICLE_COLOR = '#d8d8d8';
	private static readonly SPEED = 0.8;

	constructor(
		private plainSize: IPlainSize,
		private particleRenderer: IParticleRenderer,
		public readonly position: Position,
		private angle: number,
		private readonly radius: number
	) {}

	public updatePosition = () => {
		this.changeAngleWhenTooFarFromPlain();

		this.position.x +=
			Particle.SPEED * Math.cos((this.angle * Math.PI) / 180);
		this.position.y +=
			Particle.SPEED * Math.sin((this.angle * Math.PI) / 180);

		if (this.isOutsideGivenPlain()) return;
		this.particleRenderer.render(this.position, this.radius);
	};

	private isOutsideGivenPlain = () =>
		this.position.x > this.plainSize.getWidth() + this.radius ||
		this.position.x < -this.radius ||
		this.position.y > this.plainSize.getHeight() + this.radius ||
		this.position.y < -this.radius;

	private changeAngleWhenTooFarFromPlain = () => {
		if (this.isTooFarFromPlain()) {
			this.angle += this.angle <= 180 ? 180 : -180;
		}
	};

	public isTooFarFromPlain = () => {
		const MAX_DISTANCE_FROM_BORDER = 100;

		return (
			this.position.x >
				this.plainSize.getWidth() + MAX_DISTANCE_FROM_BORDER ||
			this.position.x < -MAX_DISTANCE_FROM_BORDER ||
			this.position.y >
				this.plainSize.getHeight() + MAX_DISTANCE_FROM_BORDER ||
			this.position.y < -MAX_DISTANCE_FROM_BORDER
		);
	};
}
