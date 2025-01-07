import { useEffect, useCallback } from "react";

import usePlayerStore, { Direction, speed } from "#/player/store";

type MovementKey = {
  UP: readonly ["w", "ArrowUp"];
  DOWN: readonly ["s", "ArrowDown"];
  LEFT: readonly ["a", "ArrowLeft"];
  RIGHT: readonly ["d", "ArrowRight"];
};

const MOVEMENT_KEYS: MovementKey = {
  UP: ["w", "ArrowUp"],
  DOWN: ["s", "ArrowDown"],
  LEFT: ["a", "ArrowLeft"],
  RIGHT: ["d", "ArrowRight"],
} as const;

const movements = {
  left: { x: -speed, y: 0 },
  right: { x: speed, y: 0 },
  up: { x: 0, y: -speed },
  down: { x: 0, y: speed },
} as const;

const Controls = () => {
  // Split selectors to avoid unnecessary re-renders
  const position = usePlayerStore(useCallback((state) => state.position, []));
  const setPosition = usePlayerStore(
    useCallback((state) => state.setPosition, [])
  );
  const setCurrentDirection = usePlayerStore(
    useCallback((state) => state.setCurrentDirection, [])
  );
  const setAction = usePlayerStore(useCallback((state) => state.setAction, []));

  // Memoize the movement handler
  const handleMovement = useCallback(
    (direction: Direction, isRepeating: boolean) => {
      const movement = movements[direction];
      setPosition({
        x: position.x + movement.x,
        y: position.y + movement.y,
      });
      setCurrentDirection(direction);
      setAction(isRepeating ? "walk" : "idle");
    },
    [position, setPosition, setCurrentDirection, setAction]
  );

  // Memoize event handlers to prevent recreating them on every render
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (MOVEMENT_KEYS.UP.includes(key as MovementKey["UP"][number])) {
        handleMovement("up", event.repeat);
      } else if (
        MOVEMENT_KEYS.DOWN.includes(key as MovementKey["DOWN"][number])
      ) {
        handleMovement("down", event.repeat);
      } else if (
        MOVEMENT_KEYS.LEFT.includes(key as MovementKey["LEFT"][number])
      ) {
        handleMovement("left", event.repeat);
      } else if (
        MOVEMENT_KEYS.RIGHT.includes(key as MovementKey["RIGHT"][number])
      ) {
        handleMovement("right", event.repeat);
      }
    },
    [handleMovement]
  );

  const handleKeyUp = useCallback(() => {
    setAction("idle");
  }, [setAction]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button === 0) {
        setAction("attack");
      }
    },
    [setAction]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (event.button === 0) {
        setAction("idle");
      }
    },
    [setAction]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp]);

  return null;
};

export default Controls;
