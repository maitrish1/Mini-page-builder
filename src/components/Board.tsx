import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";

interface BoardProps {
  elements: {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }[];
  onDrop: (
    elementType: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => void;
  onMove: (id: string, top: number, left: number) => void;
  onEditMove: (
    id: string,
    top: number,
    left: number,
    text: string,
    fontSize: number,
    fontWeight: string
  ) => void;
}

const Board: React.FC<BoardProps> = ({
  elements,
  onDrop,
  onMove,
  onEditMove,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [elementData, setElementData] = useState<{
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  }>({ text: "", x: 0, y: 0, fontSize: 16, fontWeight: "normal" });
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const elementType = e.dataTransfer.getData("text");
    const id = e.dataTransfer.getData("id");

    if (id) {
      onMove(id, e.clientY - top, e.clientX - left);
    } else {
      setCurrentElement({
        type: elementType,
        id: `element-${elements.length}`,
      });
      setModalOpen(true);
    }

    setDraggedElement(null);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedElement(id);
    e.dataTransfer.setData("text", "existingElement");
    e.dataTransfer.setData("id", id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement) {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      onMove(draggedElement, e.clientY - top, e.clientX - left);
    }
  };

  const handleSave = () => {
    if (editingElementId) {
      // Update existing element
      onEditMove(
        editingElementId,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
      setEditingElementId(null); // Reset editingElementId
    } else if (currentElement) {
      // Create new element
      onDrop(
        currentElement.type,
        elementData.x,
        elementData.y,
        elementData.text,
        elementData.fontSize,
        elementData.fontWeight
      );
    }

    setModalOpen(false);
    setElementData({
      text: "",
      x: 0,
      y: 0,
      fontSize: 16,
      fontWeight: "normal",
    });
  };

  const renderElement = (element: {
    id: string;
    type: string;
    top: number;
    left: number;
    text: string;
    fontSize: number;
    fontWeight: string;
  }) => {
    const style = {
      fontSize: `${element.fontSize}px`,
      fontWeight: element.fontWeight,
      padding: "10px",
      border: selectedElementId === element.id ? "2px solid red" : "none",
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        // Open the modal for the selected element
        setSelectedElementId(element.id);
        setEditingElementId(element.id);
        setModalOpen(true);
        setElementData({
          text: element.text,
          x: element.top,
          y: element.left,
          fontSize: element.fontSize,
          fontWeight: element.fontWeight,
        });
      }
    };

    switch (element.type) {
      case "input":
        return (
          <input 
            onKeyDown={handleKeyDown}
            placeholder="helo"
            value={element.text}
            type="text"
            style={style}
          />
        );
      case "label":
        return (
          <div tabIndex={0} onKeyDown={handleKeyDown} style={style}>
          {element.text}
        </div>
        );
      case "button":
        return (
          <button onKeyDown={handleKeyDown} style={style}>
            {element.text}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <>
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
            {renderElement(element)}
          </div>
        ))}
        {modalOpen && (
          <Dialog
            sx={{
              "& .MuiDialog-paper": {
                width: ["100%", "75%", "25%"],
                maxWidth: "none",
              },
            }}
            open={modalOpen}
            fullWidth
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Edit {currentElement?.type}
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 5,
              }}
              dividers
            >
              <TextField
                label="Text"
                fullWidth
                placeholder="hello"
                type="text"
                value={elementData.text}
                onChange={(e) =>
                  setElementData({ ...elementData, text: e.target.value })
                }
              />
              <TextField
                label="X"
                fullWidth
                type="number"
                value={elementData.x}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    x: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Y"
                fullWidth
                type="number"
                value={elementData.y}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    y: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Font size"
                fullWidth
                type="number"
                value={elementData.fontSize}
                onChange={(e) =>
                  setElementData({
                    ...elementData,
                    fontSize: parseInt(e.target.value),
                  })
                }
              />

              <TextField
                label="Font weight"
                fullWidth
                type="text"
                value={elementData.fontWeight}
                onChange={(e) =>
                  setElementData({ ...elementData, fontWeight: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" autoFocus onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Board;
