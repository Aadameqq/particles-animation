export interface IPlainSize {
	setSize: (width: number, height: number) => void;
	updateSize: () => void;
	getWidth: () => number;
	getHeight: () => number;
}
