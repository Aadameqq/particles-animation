import CartesianSystemType from "../types/CartesianSystemType";
import Particle from "./Particle";

class ConnectionsDrawer {
  private LINE_COLOR = "#ecebebc2";
  private MIN_DISTANCE_FOR_CONNECTION = 8;
  private MAX_DISTANCE_FOR_CONNECTION: number = 200;

  constructor(private ctx: CanvasRenderingContext2D) {}

  public drawParticlesConnections = (particlesList: Particle[]) => {
    let lastParticleIndex = 0;
    for (const particle of particlesList) {
      this.drawConnectionsForSingleParticleIfDistanceIsFit(
        particlesList,
        particle,
        lastParticleIndex
      );
      lastParticleIndex += 1;
    }
  };

  drawConnectionsForSingleParticleIfDistanceIsFit = (
    particlesList: Particle[],
    targetParticle: Particle,
    lastParticleIndex: number
  ) => {
    for (let i = lastParticleIndex; i < particlesList.length; i += 1) {
      let secondParticle = particlesList[i];

      if (this.areParticlesEqual(targetParticle, secondParticle)) continue;

      const distance = this.calculateDistanceBetweenTwoParticles(
        targetParticle.position,
        secondParticle.position
      );

      if (this.areTwoParticlesCloseEnough(distance)) {
        this.drawConnection(
          targetParticle.position,
          secondParticle.position,
          distance
        );
      }
    }
  };

  private areTwoParticlesCloseEnough = (distance: CartesianSystemType) =>
    distance.x < this.MAX_DISTANCE_FOR_CONNECTION &&
    distance.y < this.MAX_DISTANCE_FOR_CONNECTION;

  private areParticlesEqual = (
    firstParticle: Particle,
    secondParticle: Particle
  ) => firstParticle === secondParticle;

  private drawConnection = (
    firstParticlePosition: CartesianSystemType,
    secondParticlePosition: CartesianSystemType,
    distance: CartesianSystemType
  ) => {
    this.ctx.beginPath();
    this.ctx.moveTo(firstParticlePosition.x, firstParticlePosition.y);
    this.ctx.strokeStyle = this.LINE_COLOR;
    this.ctx.lineWidth = this.calculateLineWidthBasedOnDistance(distance);
    this.ctx.lineTo(secondParticlePosition.x, secondParticlePosition.y);
    this.ctx.stroke();
  };

  private calculateLineWidthBasedOnDistance = (
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
    firstNumber: number,
    secondNumber: number
  ) => {
    return firstNumber >= secondNumber ? firstNumber : secondNumber;
  };

  private calculateDistanceBetweenTwoParticles = (
    firstParticlePosition: CartesianSystemType,
    secondParticlePosition: CartesianSystemType
  ) => {
    const distance = {
      x: Math.abs(firstParticlePosition.x - secondParticlePosition.x),
      y: Math.abs(firstParticlePosition.y - secondParticlePosition.y),
    };
    return distance;
  };
}

export default ConnectionsDrawer;
