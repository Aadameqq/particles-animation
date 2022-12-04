import randomValue from './randomValue';

const randomPosition = (maxX, maxY) => {
	const position = {
		x: randomValue(0, maxX),
		y: randomValue(0, maxY),
	};

	return position;
};

export default randomPosition;
