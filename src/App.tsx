import GameStage from "@/components/game-stage";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[1400px] aspect-video border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <GameStage />
      </div>
    </div>
  );
}

export default App;
