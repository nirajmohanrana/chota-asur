import useImage from "use-image";
import sprite from "@/assets/player.png";
import { Layer, Rect, Sprite } from "react-konva";
import { Sprite as s, SpriteConfig } from "konva/lib/shapes/Sprite";
import { useRef, useEffect } from "react";
import usePlayerStore, {
  width,
  height,
  offsetX,
  offsetY,
  hitBoxWidth,
  hitBoxHeight,
  hitBoxOffsetX,
  hitBoxOffsetY,
} from "#/player/store";
import {
  animations,
  idleAnimationFrameRate,
  walkAnimationFrameRate,
} from "#/player/animation";

const Player = () => {
  const [image] = useImage(sprite);
  const spriteRef = useRef<InstanceType<typeof s> | null>(null);

  const position = usePlayerStore((state) => state.position);
  const currentDirection = usePlayerStore((state) => state.currentDirection);
  const currentAction = usePlayerStore((state) => state.currentAction);
  const isHit = usePlayerStore((state) => state.isHit);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
    }
  }, []);

  const isLeft = currentDirection === "left";

  const animationKey = isLeft
    ? `${currentAction}-right`
    : `${currentAction}-${currentDirection}`;

  const spriteConfig: SpriteConfig = {
    image: image as HTMLImageElement,
    x: position.x,
    y: position.y,
    width,
    height,
    offsetX,
    offsetY,
    scale: { x: 1 * (isLeft ? -1 : 1), y: 1 },
    animation: animationKey,
    animations: animations,
    frameIndex: 0,
    frameRate:
      currentAction === "idle"
        ? idleAnimationFrameRate
        : walkAnimationFrameRate,
  };

  return (
    <Layer imageSmoothingEnabled={false}>
      <Sprite ref={spriteRef} {...spriteConfig} />
      <Rect
        x={position.x}
        y={position.y}
        width={hitBoxWidth}
        height={hitBoxHeight}
        offset={{ x: hitBoxOffsetX, y: hitBoxOffsetY }}
        stroke={isHit ? "red" : "black"}
      />
    </Layer>
  );
};

export default Player;
