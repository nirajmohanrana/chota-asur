import GameStage from "@/components/stage/game-stage";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="border shadow">
        <GameStage />
      </div>
    </div>
  );
}

export default App;
