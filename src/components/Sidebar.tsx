import React from "react";

interface SidebarProps {
  onDragStart: (e: React.DragEvent, elementType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <div className="p-3 h-full bg-black">
      <div className="bg-black">BLOCKS</div>
      <div className="sidebar">
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm"
          draggable
          onDragStart={(e) => onDragStart(e, "label")}
        >
          🔗 Label
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm"
          draggable
          onDragStart={(e) => onDragStart(e, "input")}
        >
          🔗 Input
        </div>
        <div
          className="mb-2 p-2 bg-white cursor-grab rounded-sm"
          draggable
          onDragStart={(e) => onDragStart(e, "button")}
        >
          🔗 Button
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
