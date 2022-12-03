import AnimationScene from "./components/AnimationScene";
import { PlainManagerImplementation } from "./components/PlainManagerImplementation";
import { PlainSize } from "./components/PlainSize";

window.onload = () => {
  const canvas = document.querySelector(`.canvas`)! as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const plainSize = new PlainSize(window.innerWidth, window.innerHeight);
  const animation = new AnimationScene(
    canvas,
    new PlainManagerImplementation(ctx!, plainSize),
    plainSize
  );
};
