import useImage from "use-image";
import sprite from "@/assets/slime.png";
import { Layer, Rect, Sprite } from "react-konva";
import { Sprite as s, SpriteConfig } from "konva/lib/shapes/Sprite";
import { useRef, useEffect, Fragment } from "react";

import { animations } from "#/enemies/slime/animation";

import useSlimeStore, {
  type Slime as SlimeType,
  width,
  height,
  offsetX,
  offsetY,
  hitBoxWidth,
  hitBoxHeight,
  hitBoxOffsetX,
  hitBoxOffsetY,
} from "#/enemies/slime/store";
import usePlayerStore from "@/components/player/store";

const Slime = ({ slime }: { slime: SlimeType }) => {
  const [image] = useImage(sprite);
  const spriteRef = useRef<InstanceType<typeof s> | null>(null);
  const setIsHit = useSlimeStore((state) => state.setIsHit);
  const playerPosition = usePlayerStore((state) => state.position);
  const setPlayerIsHit = usePlayerStore((state) => state.setIsHit);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
    }
  }, []);

  const slimeHitBoxBounds = {
    x: slime.position.x,
    y: slime.position.y,
    width: hitBoxWidth,
    height: hitBoxHeight,
  };

  const playerHitBoxBounds = {
    x: playerPosition.x,
    y: playerPosition.y,
    width: hitBoxWidth,
    height: hitBoxHeight,
  };

  const isHitBoxColliding = (
    hitBox1: { x: number; y: number; width: number; height: number },
    hitBox2: { x: number; y: number; width: number; height: number }
  ) =>
    hitBox1.x < hitBox2.x + hitBox2.width &&
    hitBox1.x + hitBox1.width > hitBox2.x &&
    hitBox1.y < hitBox2.y + hitBox2.height &&
    hitBox1.y + hitBox1.height > hitBox2.y;

  const isColliding = isHitBoxColliding(slimeHitBoxBounds, playerHitBoxBounds);
  console.log(isColliding);

  useEffect(() => {
    setIsHit(slime.id, isColliding);
    setPlayerIsHit(isColliding);
  }, [isColliding, setIsHit, setPlayerIsHit, slime.id]);

  const spriteConfig: SpriteConfig = {
    image: image as HTMLImageElement,
    x: slime.position.x,
    y: slime.position.y,
    width,
    height,
    offsetX,
    offsetY,

    animation: "walk-right",
    animations: animations,
    frameIndex: 0,
    frameRate: 7,
  };

  return (
    <Fragment key={`frag-${slime.id}`}>
      <Sprite key={slime.id} ref={spriteRef} {...spriteConfig} />
      <Rect
        x={slime.position.x}
        y={slime.position.y}
        width={hitBoxWidth}
        height={hitBoxHeight}
        offset={{ x: hitBoxOffsetX, y: hitBoxOffsetY }}
        stroke={slime.isHit ? "red" : "black"}
      />
    </Fragment>
  );
};

function SlimeLayer() {
  const slimes = useSlimeStore((state) => state.slimes);
  return (
    <Layer imageSmoothingEnabled={false}>
      {slimes.map((slime) => (
        <Slime key={slime.id} slime={slime} />
      ))}
    </Layer>
  );
}

export default SlimeLayer;
