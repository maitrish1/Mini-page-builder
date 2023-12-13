import React, { useState } from "react";

interface BoardProps {
  elements: { id: string; type: string; top: number; left: number }[];
  onDrop: (elementType: string, top: number, left: number) => void;
  onMove: (id: string, top: number, left: number) => void;
}


const Board: React.FC<BoardProps> = ({ elements, onDrop, onMove }) => {
    const [draggedElement, setDraggedElement] = useState<string | null>(null);
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
        const elementType = e.dataTransfer.getData("text");
        const { top, left } = e.currentTarget.getBoundingClientRect();
        console.log('Dropped element:', elementType, 'Coordinates:', e.clientY - top, e.clientX - left);
        onDrop(elementType, e.clientY - top, e.clientX - left);
        setDraggedElement(null);
      
    };
  
    const handleDragStart = (e: React.DragEvent, id: string) => {
      console.log('handleDragStart called');
      setDraggedElement(id);
      e.dataTransfer.setData("text", id);
    };
  
    const handleMouseMove = (e: React.MouseEvent) => {
      if (draggedElement) {
        const { top, left } = e.currentTarget.getBoundingClientRect();
        console.log('Moving element:', draggedElement, 'Coordinates:', e.clientY - top, e.clientX - left);
        onMove(draggedElement, e.clientY - top, e.clientX - left);
      }
    };
    
    return (
      <div
        className="w-full relative h-full"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{ top: element.top, left: element.left }}
            draggable
            onDragStart={(e) => handleDragStart(e, element.id)}
          >
            {element.top}, {element.left}
            {element.type}
          </div>
        ))}
      </div>
    );
  };
  
  export default Board;
  