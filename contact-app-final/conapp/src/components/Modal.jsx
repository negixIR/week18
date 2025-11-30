import React from 'react';

function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <p>{message}</p>
      <div className="modal-actions">
        <button className="btn btn-danger" onClick={onConfirm}>تایید</button>
        <button className="btn btn-secondary" onClick={onCancel}>لغو</button>
      </div>
    </div>
  );
}

export default Modal;