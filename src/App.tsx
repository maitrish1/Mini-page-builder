import React, { useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {
  const [boardElements, setBoardElements] = useState<{
    id: string;
    type: string;
    top: number;
    left: number;
  }[]>([]);

  const handleDrop = (elementType: string, top: number, left: number) => {
    const newElement = {
      id: `element-${boardElements.length}`,
      type: elementType,
      top,
      left,
    };
    setBoardElements((prevElements) => [...prevElements, newElement]);
  };

  const handleMove = (id: string, top: number, left: number) => {
    console.log('inside handlemove app.tsx')
    setBoardElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, top, left } : element
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text", id);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-3/4 h-full bg-slate-200">
        <Board elements={boardElements} onDrop={handleDrop} onMove={handleMove} />
      </div>
      <div className="w-1/4 h-full">
        <Sidebar onDragStart={handleDragStart} />
      </div>
    </div>
  );
}

export default App;
