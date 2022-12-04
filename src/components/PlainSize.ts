export class PlainSize {
	constructor(private width: number, private height: number) {}
	public setSize(width, height) {
		this.width = width;
		this.height = height;
	}
	public getSize() {
		return { width: this.width, height: this.height };
	}
}
