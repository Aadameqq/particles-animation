import { IPlainManager } from './IPlainManager';
import { IPlainSize } from './IPlainSize';
import { Position } from '../../utils/Position';

export class PlainManager implements IPlainManager {
	constructor(
		private context: CanvasRenderingContext2D,
		private plainSize: IPlainSize
	) {}

	public cleanPlain = () => {
		this.context!.clearRect(
			0,
			0,
			this.plainSize.getWidth(),
			this.plainSize.getHeight()
		);
	};

	public drawCircle = (position: Position, radius: number, color: string) => {
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
	};

	public drawLine = (
		startPosition: Position,
		endPosition: Position,
		thickness: number,
		color: string
	) => {
		this.context.beginPath();
		this.context.moveTo(startPosition.x, startPosition.y);
		this.context.strokeStyle = color;
		this.context.lineWidth = thickness;
		this.context.lineTo(endPosition.x, endPosition.y);
		this.context.stroke();
	};
}
