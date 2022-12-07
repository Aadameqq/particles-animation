import { Particle } from './Particle';
import { CartesianSystemType } from '../../types/CartesianSystemType';

export interface IParticleFactory {
	create: (position?: CartesianSystemType) => Particle;
}
