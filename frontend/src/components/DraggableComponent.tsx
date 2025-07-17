import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const DragIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="#727785"
    style={{ marginRight: 8, opacity: 0.7 }}
  >
    <path
      fillRule="evenodd"
      d="M7.375 3.67c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17zm0 8.66c0-.646-.56-1.17-1.25-1.17s-1.25.524-1.25 1.17c0 .645.56 1.17 1.25 1.17s1.25-.525 1.25-1.17zm-1.25-5.5c.69 0 1.25.525 1.25 1.17 0 .645-.56 1.17-1.25 1.17S4.875 8.645 4.875 8c0-.645.56-1.17 1.25-1.17zm5-3.16c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17zm-1.25 7.49c.69 0 1.25.524 1.25 1.17 0 .645-.56 1.17-1.25 1.17s-1.25-.525-1.25-1.17c0-.646.56-1.17 1.25-1.17zM11.125 8c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .645.56 1.17 1.25 1.17s1.25-.525 1.25-1.17z"
    />
  </svg>
);

interface DraggableComponentProps {
  item: string;
  index: number;
}

export default function DraggableComponent({
  item,
  index,
}: DraggableComponentProps) {
  return (
    <Draggable key={item} draggableId={item} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "16px 20px",
            marginBottom: 8,
            borderRadius: 8,
            background: snapshot.isDragging ? "#fa6d43" : "#0B1739",
            color: "#fff",
            fontWeight: 500,
            boxShadow: snapshot.isDragging
              ? "0 4px 16px rgba(37,99,235,0.25)"
              : "none",
            display: "flex",
            alignItems: "center",
            ...provided.draggableProps.style,
          }}
        >
          <DragIcon />
          {item}
        </div>
      )}
    </Draggable>
  );
}
