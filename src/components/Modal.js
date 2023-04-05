import React from 'react';
import '../Modal.css';

const Modal = ({ isOpen, children, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
