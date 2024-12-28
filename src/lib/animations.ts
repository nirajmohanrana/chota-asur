const up = 0;
const left = 64;
const down = 128;
const right = 192;

const width = 64;
const height = 64;

const walk = 8 * 64;

export const animations = {
  "idle-up": [...[64, up, width, height], ...[128, up, width, height]],
  "idle-left": [...[64, left, width, height], ...[128, left, width, height]],
  "idle-down": [...[64, down, width, height], ...[128, down, width, height]],
  "idle-right": [...[64, right, width, height], ...[128, right, width, height]],
  "walk-up": [
    ...[0, up + walk, width, height],
    ...[64, up + walk, width, height],
    ...[64 * 2, up + walk, width, height],
    ...[64 * 3, up + walk, width, height],
    ...[64 * 4, up + walk, width, height],
    ...[64 * 5, up + walk, width, height],
    ...[64 * 6, up + walk, width, height],
    ...[64 * 7, up + walk, width, height],
    ...[64 * 8, up + walk, width, height],
  ],
  "walk-left": [
    ...[0, left + walk, width, height],
    ...[64, left + walk, width, height],
    ...[64 * 2, left + walk, width, height],
    ...[64 * 3, left + walk, width, height],
    ...[64 * 4, left + walk, width, height],
    ...[64 * 5, left + walk, width, height],
    ...[64 * 6, left + walk, width, height],
    ...[64 * 7, left + walk, width, height],
    ...[64 * 8, left + walk, width, height],
  ],
  "walk-right": [
    ...[0, right + walk, width, height],
    ...[64, right + walk, width, height],
    ...[64 * 2, right + walk, width, height],
    ...[64 * 3, right + walk, width, height],
    ...[64 * 4, right + walk, width, height],
    ...[64 * 5, right + walk, width, height],
    ...[64 * 6, right + walk, width, height],
    ...[64 * 7, right + walk, width, height],
    ...[64 * 8, right + walk, width, height],
  ],
  "walk-down": [
    ...[0, down + walk, width, height],
    ...[64, down + walk, width, height],
    ...[64 * 2, down + walk, width, height],
    ...[64 * 3, down + walk, width, height],
    ...[64 * 4, down + walk, width, height],
    ...[64 * 5, down + walk, width, height],
    ...[64 * 6, down + walk, width, height],
    ...[64 * 7, down + walk, width, height],
    ...[64 * 8, down + walk, width, height],
  ],
} as const;
