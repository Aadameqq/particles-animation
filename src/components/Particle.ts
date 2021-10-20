import CartesianSystemType from "../types/CartesianSystemType";
import randomPosition from "../utils/randomPosition";
import randomValue from "../utils/randomValue";
export default class Particle {
  private PARTICLE_COLOR = "#d8d8d8";
  private SPEED = 0.8;

  public shouldBeRemovedWhenExitCanvas: boolean = false;
  private angle: number;
  private radius: number;

  constructor(
    private context: CanvasRenderingContext2D,
    private screenSize: CartesianSystemType,
    public position: CartesianSystemType = randomPosition(
      screenSize.x,
      screenSize.y
    )
  ) {
    const MIN_ANGLE = 0;
    const MAX_ANGLE = 360;
    this.angle = randomValue(MIN_ANGLE, MAX_ANGLE);

    const MIN_SIZE = 2;
    const MAX_SIZE = 5;
    this.radius = randomValue(MIN_SIZE, MAX_SIZE);
  }

  public onUpdate = () => {
    this.changeAngleWhenTooFarTheCanvas();

    this.position.x += this.SPEED * Math.cos((this.angle * Math.PI) / 180);
    this.position.y += this.SPEED * Math.sin((this.angle * Math.PI) / 180);

    this.render();
  };

  private render = () => {
    if (this.isOutsideCanvas()) return;

    const CIRCLE_START_ANGLE_IN_RADIANS = 0;
    const CIRCLE_END_ANGLE_IN_RADIANS = 2 * Math.PI;

    this.context.beginPath();
    this.context.fillStyle = this.PARTICLE_COLOR;
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      CIRCLE_START_ANGLE_IN_RADIANS,
      CIRCLE_END_ANGLE_IN_RADIANS
    );
    this.context.fill();
  };

  private isOutsideCanvas = () =>
    this.position.x > this.screenSize.x + this.radius ||
    this.position.x < this.radius ||
    this.position.y > this.screenSize.y + this.radius ||
    this.position.y < this.radius;

  private changeAngleWhenTooFarTheCanvas = () => {
    if (this.isTooFarTheCanvas()) {
      this.angle += this.angle <= 180 ? 180 : -180;
    }
  };

  public isTooFarTheCanvas = () => {
    const MAX_DISTANCE_FROM_BORDER = 100;

    return (
      this.position.x > this.screenSize.x + MAX_DISTANCE_FROM_BORDER ||
      this.position.x < -MAX_DISTANCE_FROM_BORDER ||
      this.position.y > this.screenSize.y + MAX_DISTANCE_FROM_BORDER ||
      this.position.y < -MAX_DISTANCE_FROM_BORDER
    );
  };
}
