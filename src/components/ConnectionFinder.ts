import { Point } from './Point';
import { Connection } from './Connection';
import CartesianSystemType from '../types/CartesianSystemType';
import Particle from './Particle';

export class ConnectionFinder {
	private MIN_DISTANCE_FOR_CONNECTION = 8;
	private MAX_DISTANCE_FOR_CONNECTION: number = 200;

	constructor(private points: Point[]) {}

	public passEveryConnectionToCallback(
		callback: (connection: Connection) => void
	) {
		this.points.forEach((point, index) => {
			const connections = this.getAllGivenPointConnections(point, index);
			connections.forEach((connection) => callback(connection));
		});
	}

	private getAllGivenPointConnections = (
		targetPoint: Point,
		index: number
	) => {
		let connections: Connection[] = [];
		for (
			let i = index - 1 > 0 ? index - 1 : 0; //Todo: check whether this does make sense
			i < this.points.length;
			i += 1
		) {
			const secondPoint = this.points[i];

			if (this.arePointsEqual(targetPoint, secondPoint)) continue;

			const distance = this.calculateDistanceBetweenPoints(
				targetPoint,
				secondPoint
			);

			const connectionWidth =
				this.calculateConnectionWidthBasedOnDistance(distance);

			if (this.arePointsCloseEnough(distance)) {
				const connection = new Connection(
					targetPoint,
					secondPoint,
					connectionWidth
				);
				connections.push(connection);
			}
		}
		return connections;
	};

	private arePointsCloseEnough = (distance: CartesianSystemType) =>
		distance.x < this.MAX_DISTANCE_FOR_CONNECTION &&
		distance.y < this.MAX_DISTANCE_FOR_CONNECTION;

	private arePointsEqual = (firstPoint: Point, secondPoint: Point) =>
		firstPoint === secondPoint;

	private calculateConnectionWidthBasedOnDistance = (
		distance: CartesianSystemType
	) => {
		const invertedDistance =
			this.MAX_DISTANCE_FOR_CONNECTION -
			this.getLargestOfTwoNumbers(distance.x, distance.y);

		const finalInvertedDistance = this.getLargestOfTwoNumbers(
			invertedDistance,
			this.MIN_DISTANCE_FOR_CONNECTION
		);

		return finalInvertedDistance / this.MAX_DISTANCE_FOR_CONNECTION;
	};

	private getLargestOfTwoNumbers = (
		//TODO: move somewhere else
		firstNumber: number,
		secondNumber: number
	) => {
		return firstNumber >= secondNumber ? firstNumber : secondNumber;
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
