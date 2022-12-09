import { IPlainManager } from '../plain';
import { Connection } from './Connection';
import { Point } from '../../utils/Point';
import { ConnectionFinder } from './ConnectionFinder';
import { Rgba } from '../../utils/Rgba';

export class ConnectionsDrawer {
	private defaultLineColor = new Rgba(236, 235, 235, 1);

	constructor(private plainManager: IPlainManager) {}

	public drawAllConnections = (points: Point[]) => {
		const connectionFinder = new ConnectionFinder(points);
		connectionFinder.passEveryConnectionToCallback(this.drawConnection);
	};

	private drawConnection = (connection: Connection) => {
		this.plainManager.drawLine(
			connection.startPoint.position,
			connection.endPoint.position,
			connection.strength,
			this.defaultLineColor.toStringForGivenAlpha(connection.strength)
		);
	};
}
