import { Point } from './Point';
import { Connection } from './Connection';
import { CartesianSystemType } from '../types/CartesianSystemType';

export class ConnectionFinder {
	private MIN_DISTANCE_FOR_CONNECTION = 8;
	private MAX_DISTANCE_FOR_CONNECTION: number = 200;

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
		const connectionWidth =
			this.calculateConnectionWidthBasedOnDistance(distance);

		if (!this.arePointsCloseEnough(distance)) return false;

		return new Connection(firstPoint, secondPoint, connectionWidth);
	};

	private arePointsCloseEnough = (distance: CartesianSystemType) =>
		distance.x < this.MAX_DISTANCE_FOR_CONNECTION &&
		distance.y < this.MAX_DISTANCE_FOR_CONNECTION;

	private calculateConnectionWidthBasedOnDistance = (
		distance: CartesianSystemType
	) => {
		const invertedDistance =
			this.MAX_DISTANCE_FOR_CONNECTION - Math.max(distance.x, distance.y);

		const finalInvertedDistance = Math.max(
			invertedDistance,
			this.MIN_DISTANCE_FOR_CONNECTION
		);

		return finalInvertedDistance / this.MAX_DISTANCE_FOR_CONNECTION;
	};

	private calculateDistanceBetweenPoints = (
		firstPoint: Point,
		secondPoint: Point
	) => {
		const distance = {
			x: Math.abs(firstPoint.position.x - secondPoint.position.x),
			y: Math.abs(firstPoint.position.y - secondPoint.position.y),
		};
		return distance;
	};
}
