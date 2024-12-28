import { useEffect } from "react";
import usePlayerStore from "@/store/player";

const PlayerControls = () => {
  const position = usePlayerStore((state) => state.position);
  const setPosition = usePlayerStore((state) => state.setPosition);
  const setDirection = usePlayerStore((state) => state.setCurrentDirection);
  const setAction = usePlayerStore((state) => state.setAction);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const STEP = 4;

      const moves: Record<string, () => void> = {
        a: () => {
          setPosition({ x: position.x - STEP, y: position.y });
          setDirection("left");
        },
        d: () => {
          setPosition({ x: position.x + STEP, y: position.y });
          setDirection("right");
        },
        w: () => {
          setPosition({ x: position.x, y: position.y - STEP });
          setDirection("up");
        },
        s: () => {
          setPosition({ x: position.x, y: position.y + STEP });
          setDirection("down");
        },
      };

      const move = moves[event.key];

      if (move) {
        move();

        if (event.repeat) {
          setAction("walk");
        } else {
          setAction("idle");
        }
      }
    };

    const handleKeyUp = () => {
      setAction("idle");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [position, setAction, setDirection, setPosition]);

  return null;
};

export default PlayerControls;
