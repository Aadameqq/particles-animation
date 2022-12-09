import { CartesianSystemType } from '../../types/CartesianSystemType';
import { Particle } from './Particle';
import { IParticleFactory } from './IParticleFactory';

export class ParticlesList {
	private particles: Particle[] = [];

	constructor(
		private particleFactory: IParticleFactory,
		private particlesNumber: number = 100
	) {
		this.initializeDefaultParticles();
	}

	private initializeDefaultParticles = () => {
		for (let i = 0; i < this.particlesNumber; i++) {
			this.addNewParticle();
		}
	};

	public addNewParticle = (position?: CartesianSystemType) => {
		const particle = this.particleFactory.create(position);
		this.particles.push(particle);
	};

	public updateParticles = () => {
		this.particles.map((particle) => {
			particle.updatePosition();
			this.reduceParticlesCount(particle);
		});
	};

	public getParticles = () => {
		return this.particles;
	};

	private reduceParticlesCount = (particle: Particle) => {
		if (
			particle.isTooFarFromPlain() &&
			this.particles.length > this.particlesNumber
		) {
			this.particles = this.particles.filter((x) => x !== particle);
		}
	};
}
