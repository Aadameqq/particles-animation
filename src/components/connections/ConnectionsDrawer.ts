import { IPlainManager } from '../plain/IPlainManager';
import { Connection } from './Connection';
import { Point } from './Point';
import { ConnectionFinder } from './ConnectionFinder';

export class ConnectionsDrawer {
	private LINE_COLOR = '#ecebebc2';

	constructor(private plainManager: IPlainManager) {}

	public drawAllConnections = (points: Point[]) => {
		const connectionFinder = new ConnectionFinder(points);
		connectionFinder.passEveryConnectionToCallback(this.drawConnection);
	};

	private drawConnection = (connection: Connection) => {
		this.plainManager.drawLine(
			connection.startPoint.position,
			connection.endPoint.position,
			connection.connectionWidth,
			this.LINE_COLOR
		);
	};
}
