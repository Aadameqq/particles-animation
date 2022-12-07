import { CartesianSystemType } from '../../types/CartesianSystemType';
import { Particle } from './Particle';
import { IParticleFactory } from './IParticleFactory';

export class ParticlesList {
	private static readonly PARTICLES_NUMBER = 100;
	private particles: Particle[] = [];

	constructor(private particleFactory: IParticleFactory) {
		this.initializeDefaultParticles();
	}

	private initializeDefaultParticles = () => {
		for (let i = 0; i < ParticlesList.PARTICLES_NUMBER; i++) {
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
			this.particles.length > ParticlesList.PARTICLES_NUMBER
		) {
			console.log(this.particles.length);
			this.particles = this.particles.filter((x) => x !== particle);
		}
	};
}
