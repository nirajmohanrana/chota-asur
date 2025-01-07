import { create } from "zustand";

export type Direction = "up" | "down" | "left" | "right";
export type Action = "walk" | "idle" | "attack";

export const width = 32;
export const height = 32;
export const offsetX = width / 2;
export const offsetY = height / 2;

export const hitBoxWidth = width / 2;
export const hitBoxHeight = height / 2;
export const hitBoxOffsetX = hitBoxWidth / 2;
export const hitBoxOffsetY = hitBoxHeight / 2;

export const speed = 4;

interface Player {
  position: { x: number; y: number };
  currentDirection: Direction;
  currentAction: Action;
  isHit: boolean;
}

const initialState: Player = {
  position: { x: 100, y: 100 },
  currentDirection: "down",
  currentAction: "idle",
  isHit: false,
};

interface PlayerStore extends Player {
  setPosition: (position: { x: number; y: number }) => void;
  setCurrentDirection: (direction: Direction) => void;
  setAction: (action: Action) => void;
  setIsHit: (isHit: boolean) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  ...initialState,
  setPosition: (position) => set({ position }),
  setCurrentDirection: (direction) => set({ currentDirection: direction }),
  setAction: (Action) => set({ currentAction: Action }),
  setIsHit: (isHit) => set({ isHit }),
}));

export default usePlayerStore;
