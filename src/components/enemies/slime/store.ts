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

export interface Slime {
  id: string;
  position: { x: number; y: number };
  currentDirection: Direction;
  currentAction: Action;
  isHit: boolean;
}

const initialState: Slime[] = [
  {
    id: "slime-1",
    position: { x: 150, y: 100 },
    currentDirection: "right",
    currentAction: "idle",
    isHit: false,
  },
  {
    id: "slime-2",
    position: { x: 200, y: 150 },
    currentDirection: "right",
    currentAction: "walk",
    isHit: false,
  },
];

interface SlimeStore {
  slimes: Slime[];
  setPosition: (id: string, position: { x: number; y: number }) => void;
  setCurrentDirection: (id: string, direction: Direction) => void;
  setAction: (id: string, action: Action) => void;
  setIsHit: (id: string, isHit: boolean) => void;
}

const useSlimeStore = create<SlimeStore>((set) => ({
  slimes: initialState,
  setPosition: (id, position) =>
    set((state) => ({
      slimes: state.slimes.map((slime) =>
        slime.id === id ? { ...slime, position } : slime
      ),
    })),
  setCurrentDirection: (id, direction) =>
    set((state) => ({
      slimes: state.slimes.map((slime) =>
        slime.id === id ? { ...slime, currentDirection: direction } : slime
      ),
    })),
  setAction: (id, action) =>
    set((state) => ({
      slimes: state.slimes.map((slime) =>
        slime.id === id ? { ...slime, currentAction: action } : slime
      ),
    })),
  setIsHit: (id, isHit) =>
    set((state) => ({
      slimes: state.slimes.map((slime) =>
        slime.id === id ? { ...slime, isHit } : slime
      ),
    })),
}));

export default useSlimeStore;
