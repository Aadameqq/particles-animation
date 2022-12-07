import { IPlainSize } from './IPlainSize';

export class PlainSize implements IPlainSize {
	constructor(
		private width: number,
		private height: number,
		private canvas: HTMLCanvasElement
	) {}

	public setSize = (width, height) => {
		this.width = width;
		this.height = height;
	};

	public updateSize = () => {
		this.setSize(window.innerWidth, window.innerHeight);

		const ratio = Math.ceil(window.devicePixelRatio);

		this.canvas.width = window.innerWidth * ratio;
		this.canvas.height = window.innerHeight * ratio;

		this.canvas.style.width = `${window.innerWidth}px`;
		this.canvas.style.height = `${window.innerHeight}px`;

		this.canvas.getContext('2d')!.setTransform(ratio, 0, 0, ratio, 0, 0);
	};

	public getWidth = () => this.width;
	public getHeight = () => this.height;
}
