import { create } from "zustand";

export type Direction = "up" | "down" | "left" | "right";
export type Action = "walk" | "idle";

interface Player {
  position: { x: number; y: number };
  currentDirection: Direction;
  currentAction: Action;
}

const initialState: Player = {
  position: { x: 100, y: 100 },
  currentDirection: "down",
  currentAction: "idle",
};

interface PlayerStore extends Player {
  setPosition: (position: { x: number; y: number }) => void;
  setCurrentDirection: (direction: Direction) => void;
  setAction: (action: Action) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  ...initialState,
  setPosition: (position) => set({ position }),
  setCurrentDirection: (direction) => set({ currentDirection: direction }),
  setAction: (Action) => set({ currentAction: Action }),
}));

export default usePlayerStore;
