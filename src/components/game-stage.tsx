import { Layer, Stage } from "react-konva";
import Player from "@/components/player";
import PlayerControls from "@/components/player-controls";

const GameStage = () => {
  return (
    <>
      <PlayerControls />
      <Stage width={1920} height={1080}>
        <Layer>
          <Player />
        </Layer>
      </Stage>
    </>
  );
};

export default GameStage;
