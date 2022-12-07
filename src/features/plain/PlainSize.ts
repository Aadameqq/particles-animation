import { IPlainSize } from './IPlainSize';

export class PlainSize implements IPlainSize {
	constructor(private width: number, private height: number) {}
	public setSize = (width, height) => {
		this.width = width;
		this.height = height;
	};
	public getWidth = () => this.width;
	public getHeight = () => this.height;
}
//TODO: move all size logic to here
