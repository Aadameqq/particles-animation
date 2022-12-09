export class Rgba {
	public readonly red: number;
	public readonly green: number;
	public readonly blue: number;
	public readonly alpha: number;

	constructor(red: number, green: number, blue: number, alpha = 100) {
		this.validate(red, green, blue, alpha);

		this.red = Math.round(red);
		this.green = Math.round(green);
		this.blue = Math.round(blue);
		this.alpha = alpha;
	}
	private validate = (
		red: number,
		green: number,
		blue: number,
		alpha: number
	) => {
		const colorErrorMessage =
			'Rgba color value must be a number between 0 and 255 inclusive';

		const colorsToValidate = [red, green, blue];

		colorsToValidate.forEach((color) => {
			if (color > 255 || color < 0) throw new Error(colorErrorMessage);
		});

		this.validateAlpha(alpha);
	};

	public toString = () => {
		return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
	};

	public toStringForGivenAlpha = (alpha: number) => {
		this.validateAlpha(alpha);
		return `rgba(${this.red},${this.green},${this.blue},${alpha})`;
	};

	private validateAlpha = (alpha: number) => {
		const alphaErrorMessage =
			'Rgba alpha value must be a number between 0 and 1 inclusive';

		if (alpha < 0 || alpha > 1) throw new Error(alphaErrorMessage);
	};
}
