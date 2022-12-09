import { ParticlesList, ParticleFactory } from '../particles';
import { IPlainManager, PlainManager, PlainSize, IPlainSize } from '../plain';
import { ConnectionsDrawer } from '../connections';
import { Position } from '../../utils/Position';

export class Animation {
	private readonly particlesList: ParticlesList;
	private readonly connectionsDrawer: ConnectionsDrawer;
	private readonly plainSize: IPlainSize;
	private readonly plainManager: IPlainManager;

	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D
	) {
		this.plainSize = new PlainSize(0, 0, canvas, ctx);
		this.plainSize.updateSize();

		this.plainManager = new PlainManager(ctx, this.plainSize);

		const particleFactory = new ParticleFactory(
			this.plainManager,
			this.plainSize
		);
		this.particlesList = new ParticlesList(
			particleFactory,
			this.plainSize.getWidth() / 10
		);

		this.connectionsDrawer = new ConnectionsDrawer(this.plainManager);
	}

	public startAnimation = () => {
		this.initializeEventListeners();

		requestAnimationFrame(this.handleUpdate);
	};

	private handleUpdate = () => {
		this.plainManager.cleanPlain();

		const particles = this.particlesList.getParticles();
		this.connectionsDrawer.drawAllConnections(particles);

		this.particlesList.updateParticles();

		requestAnimationFrame(this.handleUpdate);
	};

	private initializeEventListeners = () => {
		document.addEventListener('click', this.handleClick);
		window.addEventListener('resize', this.plainSize.updateSize);
	};

	private handleClick = ({
		clientX,
		clientY,
	}: {
		clientX: number;
		clientY: number;
	}) => {
		const position = new Position(clientX, clientY);
		this.particlesList?.addNewParticle(position);
	};
}
