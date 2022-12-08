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

		this.canvas.width = this.canvas.getBoundingClientRect().width;
		this.canvas.height = this.canvas.getBoundingClientRect().height;
	};

	public getWidth = () => this.width;
	public getHeight = () => this.height;
}
