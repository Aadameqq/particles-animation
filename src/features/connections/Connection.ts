import { Point } from './Point';

export class Connection {
	constructor(
		public readonly startPoint: Point,
		public readonly endPoint: Point,
		public readonly strength: number
	) {}
}
