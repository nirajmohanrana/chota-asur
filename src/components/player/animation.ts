import { width, height } from "#/player/store";

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
  "idle-down": createAnimation(0, 6),
  "idle-right": createAnimation(1, 6),
  "idle-up": createAnimation(2, 6),
  "walk-down": createAnimation(3, 6),
  "walk-right": createAnimation(4, 6),
  "walk-up": createAnimation(5, 6),
  "attack-down": createAnimation(6, 4),
  "attack-right": createAnimation(7, 4),
  "attack-up": createAnimation(8, 4),
} as const;

export { animations, idleAnimationFrameRate, walkAnimationFrameRate };
