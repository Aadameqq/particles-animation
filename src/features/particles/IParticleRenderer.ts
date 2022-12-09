import { Position } from '../../utils/Position';

export interface IParticleRenderer {
	render: (position: Position, radius: number) => void;
}
