import { Particle } from './Particle';
import { Position } from '../../utils/Position';

export interface IParticleFactory {
	create: (position?: Position) => Particle;
}
