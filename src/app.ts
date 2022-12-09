import { Animation } from './features/main';

window.onload = () => {
	const canvas = document.querySelector(`.canvas`);

	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error('Canvas does not exist');
	}

	const ctx = canvas.getContext('2d');

	if (!(ctx instanceof CanvasRenderingContext2D)) {
		throw new Error('Canvas does not have 2d context');
	}

	const animation = new Animation(canvas, ctx);
	animation.startAnimation();
};
