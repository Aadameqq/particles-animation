import { ParticlesList } from '../particles/ParticlesList';
import { ParticleFactory } from '../particles/ParticleFactory';
import { IPlainManager } from '../plain/IPlainManager';
import { ConnectionsDrawer } from '../connections/ConnectionsDrawer';
import { PlainSize } from '../plain/PlainSize';
import { PlainManager } from '../plain/PlainManager';
import { IPlainSize } from '../plain/IPlainSize';

export class Animation {
	private readonly particlesList: ParticlesList;
	private readonly connectionsDrawer: ConnectionsDrawer;
	private readonly plainSize: IPlainSize;

	private readonly plainManager: IPlainManager;

	constructor(
		private canvas: HTMLCanvasElement,
		private ctx: CanvasRenderingContext2D
	) {
		this.plainSize = new PlainSize(0, 0, canvas);
		this.plainSize.updateSize();

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
		document.addEventListener('click', this.handleClick);
		window.addEventListener('resize', this.plainSize.updateSize);
	};

	private handleClick = ({ clientX, clientY }) => {
		this.particlesList?.addNewParticle({ x: clientX, y: clientY });
	};
}
//TODO: add index files and export only needed things
//TODO: add support for mobile phones
