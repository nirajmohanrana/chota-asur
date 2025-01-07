import { Stage } from "react-konva";
import Player from "@/components/player/player";
import PlayerControls from "#/player/controls";
import Slime from "#/enemies/slime/slime";

export const scale = 2;
export const width = 1280;
export const height = 720;

const GameStage = () => {
  return (
    <>
      <PlayerControls />
      <Stage width={width} height={height} scale={{ x: scale, y: scale }}>
        <Player />
        <Slime />
      </Stage>
    </>
  );
};

export default GameStage;
