import { ParticlesList } from '../particles/ParticlesList';
import { ParticleFactory } from '../particles/ParticleFactory';
import { IPlainManager } from '../plain/IPlainManager';
import { ConnectionsDrawer } from '../connections/ConnectionsDrawer';
import { PlainSize } from '../plain/PlainSize';
import { PlainManager } from '../plain/PlainManager';
import { IPlainSize } from '../plain/IPlainSize';

export class Animation {
	private particlesList: ParticlesList;
	private connectionsDrawer: ConnectionsDrawer;
	private plainSize: IPlainSize = new PlainSize(0, 0);

	private plainManager: IPlainManager;

	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D
	) {
		this.updateScreenSize();
		this.plainManager = new PlainManager(ctx, this.plainSize);

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

		this.canvas.width = this.plainSize.getWidth();
		this.canvas.height = this.plainSize.getHeight();
	};
}
