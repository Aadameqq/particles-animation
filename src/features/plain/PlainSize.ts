import { IPlainSize } from './IPlainSize';

export class PlainSize implements IPlainSize {
	constructor(
		private width: number,
		private height: number,
		private canvas: HTMLCanvasElement
	) {}

	public setSize = (width: number, height: number) => {
		this.width = width;
		this.height = height;
	};

	public updateSize = () => {
		this.setSize(window.innerWidth, window.innerHeight);

		const ratio = window.devicePixelRatio;

		this.canvas.width = Math.floor(window.innerWidth * ratio);
		this.canvas.height = Math.floor(window.innerHeight * ratio);

		this.canvas.getContext('2d')!.scale(ratio, ratio);
	};

	public getWidth = () => this.width;
	public getHeight = () => this.height;
}
