import ParticlesList from './ParticlesList';
import { ParticleFactory } from './ParticleFactory';
import { PlainManager } from './PlainManager';
import ConnectionsDrawer from './ConnectionsDrawer';
import { PlainSize } from './PlainSize';

class AnimationScene {
	private particlesList: ParticlesList | undefined;
	constructor(
		private canvas: HTMLCanvasElement,
		private plainManager: PlainManager,
		private plainSize: PlainSize
	) {
		this.updateScreenSize();
		this.initializeEventListeners();
		this.initializeParticlesController();
		requestAnimationFrame(this.onUpdate);
	}
	onUpdate = () => {
		this.plainManager.cleanPlain();
		const connectionsDrawer = new ConnectionsDrawer(this.plainManager);
		connectionsDrawer.drawAllConnections(
			this.particlesList?.getParticles()!
		);
		this.particlesList!.updateParticles();
		requestAnimationFrame(this.onUpdate);
	};

	initializeEventListeners = () => {
		window.addEventListener('resize', this.updateScreenSize);
		document.addEventListener('click', ({ clientX, clientY }) => {
			this.particlesList?.addNewParticle({ x: clientX, y: clientY });
		});
	};

	initializeParticlesController = () => {
		const particleFactory = new ParticleFactory(
			this.plainManager,
			this.plainSize
		);
		this.particlesList = new ParticlesList(particleFactory);
	};

	updateScreenSize = () => {
		this.plainSize.setSize(window.innerWidth, window.innerHeight);

		this.canvas.width = this.plainSize.getSize().width;
		this.canvas.height = this.plainSize.getSize().height;
	};
}

export default AnimationScene;
