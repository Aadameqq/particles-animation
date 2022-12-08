import { randomValue } from './randomValue';

export const randomPosition = (maxX: number, maxY: number) => {
	const position = {
		x: randomValue(0, maxX),
		y: randomValue(0, maxY),
	};

	return position;
};
