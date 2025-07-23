import React from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
          </div>
        )}
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
