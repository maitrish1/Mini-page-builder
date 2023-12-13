import React from "react";

interface BoardProps {
  elements: string[];
  onDrop: (elementType: string) => void;
}

const Board: React.FC<BoardProps> = ({ elements, onDrop }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("text");
    onDrop(elementType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full h-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {elements.map((element, index) => (
        <div key={index} className="board-element">
          {element}
        </div>
      ))}
    </div>
  );
};

export default Board;
