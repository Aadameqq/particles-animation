import { Main } from './components/Main';

window.onload = () => {
	const canvas = document.querySelector(`.canvas`)! as HTMLCanvasElement;
	const ctx = canvas.getContext('2d');
	const animation = new Main(canvas, ctx!);
	animation.startAnimation();
};
