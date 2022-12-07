import { CartesianSystemType } from '../../types/CartesianSystemType';

export interface IPlainManager {
	cleanPlain: () => void;
	drawCircle: (
		position: CartesianSystemType,
		radius: number,
		color: string
	) => void;
	drawLine: (
		startPosition: CartesianSystemType,
		endPosition: CartesianSystemType,
		thickness: number,
		color: string
	) => void;
}