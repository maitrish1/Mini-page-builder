import React, { useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const [boardElements, setBoardElements] = useState<string[]>([]);

  const handleDrop = (elementType: string) => {
    setBoardElements((prevElements) => [...prevElements, elementType]);
  };

  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    e.dataTransfer.setData("text", elementType);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-3/4 h-full">
        <Board elements={boardElements} onDrop={handleDrop} />
      </div>
      <div className="w-1/4 h-full">
        <Sidebar onDragStart={handleDragStart} />
      </div>
    </div>
  );
}

export default App;
