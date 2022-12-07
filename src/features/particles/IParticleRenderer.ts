import { CartesianSystemType } from '../../types/CartesianSystemType';

export interface IParticleRenderer {
	render: (position: CartesianSystemType, radius: number) => void;
}
