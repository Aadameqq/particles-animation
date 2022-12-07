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

		this.canvas.width = this.getWidth();
		this.canvas.height = this.getHeight();
	};

	public getWidth = () => this.width;
	public getHeight = () => this.height;
}
