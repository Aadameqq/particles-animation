import { randomValue } from './randomValue';

export const randomPosition = (maxX, maxY) => {
	const position = {
		x: randomValue(0, maxX),
		y: randomValue(0, maxY),
	};

	return position;
};
