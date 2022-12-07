import { Animation } from './features/main/Animation';

window.onload = () => {
	const canvas = document.querySelector(`.canvas`)! as HTMLCanvasElement;
	const ctx = canvas.getContext('2d');
	const animation = new Animation(canvas, ctx!);
	animation.startAnimation();
};
