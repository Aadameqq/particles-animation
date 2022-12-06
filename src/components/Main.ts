import { ParticlesList } from './ParticlesList';
import { ParticleFactory } from './ParticleFactory';
import { PlainManager } from './PlainManager';
import { ConnectionsDrawer } from './ConnectionsDrawer';
import { PlainSize } from './PlainSize';
import { PlainManagerImplementation } from './PlainManagerImplementation';

export class Main {
	private particlesList: ParticlesList;
	private connectionsDrawer: ConnectionsDrawer;
	private plainSize: PlainSize = new PlainSize(0, 0);

	private plainManager: PlainManager;

	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D
	) {
		this.updateScreenSize();
		this.plainManager = new PlainManagerImplementation(ctx, this.plainSize);

		const particleFactory = new ParticleFactory(
			this.plainManager,
			this.plainSize
		);
		this.particlesList = new ParticlesList(particleFactory);

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
		window.addEventListener('resize', this.updateScreenSize);
		document.addEventListener('click', this.handleClick);
	};

	private handleClick = ({ clientX, clientY }) => {
		this.particlesList?.addNewParticle({ x: clientX, y: clientY });
	};

	private updateScreenSize = () => {
		this.plainSize.setSize(window.innerWidth, window.innerHeight);

		this.canvas.width = this.plainSize.getSize().width;
		this.canvas.height = this.plainSize.getSize().height;
	};
}
