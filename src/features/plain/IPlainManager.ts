import { Position } from '../../utils/Position';

export interface IPlainManager {
	cleanPlain: () => void;
	drawCircle: (position: Position, radius: number, color: string) => void;
	drawLine: (
		startPosition: Position,
		endPosition: Position,
		thickness: number,
		color: string
	) => void;
}
