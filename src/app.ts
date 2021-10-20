import AnimationInitializer from "./components/AnimationInitializer";

window.onload = () => {
  const canvas = document.querySelector(`.canvas`)! as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const animation = new AnimationInitializer(canvas, ctx!);
};
