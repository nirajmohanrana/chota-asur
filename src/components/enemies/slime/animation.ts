import { width, height } from "#/enemies/slime/store";

const idleAnimationFrameRate = 4;
const walkAnimationFrameRate = 7;

const createAnimation = (row: number, length: number) =>
  Array.from({ length }, (_, i) => [
    i * width,
    row * height,
    width,
    height,
  ]).flat();

const animations = {
  "idle-right": createAnimation(0, 4),
  "walk-right": createAnimation(1, 6),
  "die-right": createAnimation(2, 5),
} as const;

export { animations, idleAnimationFrameRate, walkAnimationFrameRate };
