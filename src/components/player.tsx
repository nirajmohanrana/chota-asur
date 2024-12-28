import useImage from "use-image";
import sprite from "@/assets/sprite.png";
import { Sprite } from "react-konva";
import { Sprite as s, SpriteConfig } from "konva/lib/shapes/Sprite";
import { useRef, useEffect } from "react";
import usePlayerStore from "@/store/player";
import { animations } from "@/lib/animations";

const Player = () => {
  const [image] = useImage(sprite);
  const spriteRef = useRef<InstanceType<typeof s> | null>(null);

  const position = usePlayerStore((state) => state.position);
  const currentDirection = usePlayerStore((state) => state.currentDirection);
  const currentAction = usePlayerStore((state) => state.currentAction);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
    }
  }, [image]);

  console.log(`${currentAction}-${currentDirection}`);

  const spriteConfig: SpriteConfig = {
    image: image as HTMLImageElement,
    x: position.x,
    y: position.y,
    scale: { x: 1.5, y: 1.5 },
    animation: `${currentAction}-${currentDirection}`,
    animations: animations,
    frameIndex: 0,
    frameRate: currentAction === "idle" ? 2 : 7,
  };

  return <Sprite ref={spriteRef} {...spriteConfig} />;
};

export default Player;
