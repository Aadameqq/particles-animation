import { Point } from './Point';
import { Connection } from './Connection';
import { calculatePythagoras } from '../../utils/calculatePythagoras';

export class ConnectionFinder {
	private MAX_DISTANCE_FOR_CONNECTION: number = 170;

	constructor(private points: Point[]) {}

	public passEveryConnectionToCallback = (
		callback: (connection: Connection) => void
	) => {
		this.points.forEach((point, index) => {
			for (let i = index + 1; i < this.points.length; i += 1) {
				const secondPoint = this.points[i];

				const connection = this.getConnectionIfExists(
					point,
					secondPoint
				);

				if (connection) callback(connection);
			}
		});
	};

	private getConnectionIfExists = (
		firstPoint: Point,
		secondPoint: Point
	): false | Connection => {
		const distance = this.calculateDistanceBetweenPoints(
			firstPoint,
			secondPoint
		);
		const connectionStrength =
			this.calculateConnectionStrengthBasedOnDistance(distance);

		if (!this.arePointsCloseEnough(distance)) return false;

		return new Connection(firstPoint, secondPoint, connectionStrength);
	};

	private arePointsCloseEnough = (distance: number) =>
		distance < this.MAX_DISTANCE_FOR_CONNECTION;

	private calculateConnectionStrengthBasedOnDistance = (distance: number) => {
		const invertedDistance = this.MAX_DISTANCE_FOR_CONNECTION - distance;

		return invertedDistance / this.MAX_DISTANCE_FOR_CONNECTION;
	};

	private calculateDistanceBetweenPoints = (
		firstPoint: Point,
		secondPoint: Point
	) => {
		const distanceInEachAxis = {
			x: Math.abs(firstPoint.position.x - secondPoint.position.x),
			y: Math.abs(firstPoint.position.y - secondPoint.position.y),
		};

		const distance = Math.floor(
			calculatePythagoras(distanceInEachAxis.x, distanceInEachAxis.y)
		);

		return distance;
	};
}
