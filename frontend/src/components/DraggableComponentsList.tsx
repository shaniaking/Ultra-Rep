import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import DraggableComponent from "./DraggableComponent.tsx";

interface DraggableComponentsListProps {
  components: string[];
  onDragEnd: (result: DropResult) => void;
  scenario?: string;
  onCancel?: () => void;
  onStart?: () => void;
}

export default function DraggableComponentsList({
  components,
  onDragEnd,
  scenario,
  onCancel,
  onStart,
}: DraggableComponentsListProps) {
  return (
    <div
      style={{
        gap: 8,
        background: "#101a3c",
        padding: 16,
        width: 280,
        minHeight: "100vh",
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 70,
        bottom: 0,
      }}
    >
      {scenario && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3 style={{ color: "#fff", margin: 0, fontSize: "1.5rem" }}>
              {scenario}
            </h3>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {onCancel && (
              <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
            {onStart && (
              <button onClick={onStart} className="btn btn-primary">
                Start Simulation
              </button>
            )}
          </div>
        </div>
      )}
      <h5 className="mb-3">Components</h5>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="simulation-flow">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {components.map((item, idx) => (
                <DraggableComponent key={item} item={item} index={idx} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
