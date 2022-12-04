import CartesianSystemType from '../types/CartesianSystemType';
import { PlainManager } from './PlainManager';
import { PlainSize } from './PlainSize';

export class PlainManagerImplementation implements PlainManager {
	constructor(
		private context: CanvasRenderingContext2D,
		private plainSize: PlainSize
	) {}

	public cleanPlain = () => {
		this.context!.clearRect(
			0,
			0,
			this.plainSize.getSize().width,
			this.plainSize.getSize().height
		);
	};

	public drawCircle(
		position: CartesianSystemType,
		radius: number,
		color: string
	) {
		const CIRCLE_START_ANGLE_IN_RADIANS = 0;
		const CIRCLE_END_ANGLE_IN_RADIANS = 2 * Math.PI;

		this.context.beginPath();
		this.context.fillStyle = color;
		this.context.arc(
			position.x,
			position.y,
			radius,
			CIRCLE_START_ANGLE_IN_RADIANS,
			CIRCLE_END_ANGLE_IN_RADIANS
		);
		this.context.fill();
	}

	public drawLine(
		startPosition: CartesianSystemType,
		endPosition: CartesianSystemType,
		thickness: number,
		color: string
	) {
		this.context.beginPath();
		this.context.moveTo(startPosition.x, startPosition.y);
		this.context.strokeStyle = color;
		this.context.lineWidth = thickness;
		this.context.lineTo(endPosition.x, endPosition.y);
		this.context.stroke();
	}
}
