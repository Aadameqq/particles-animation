import { randomValue } from './randomValue';
import { Position } from './Position';

export const randomPosition = (maxX: number, maxY: number) => {
	const position = new Position(randomValue(0, maxX), randomValue(0, maxY));

	return position;
};
