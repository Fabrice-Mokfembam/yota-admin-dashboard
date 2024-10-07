import React from "react";
import "./Modal.css";

// Icons
import {
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaExclamationCircle,
} from "react-icons/fa";

const iconMap = {
  success: <FaCheckCircle className="modal-icon" style={{ color: "green" }} />,
  deleted: <FaTrash className="modal-icon" style={{ color: "red" }} />,
  edited: <FaEdit className="modal-icon" style={{ color: "blue" }} />,
  error: (
    <FaExclamationCircle className="modal-icon" style={{ color: "orange" }} />
  ),
};

function Modal({ message, type, onClose }) {
  return (
    <div className="modal">
      <div className="modal-header">{iconMap[type] || iconMap.success}</div>
      <div className="modal-message">{message}</div>
      <button className="modal-button" onClick={onClose}>
        OK
      </button>
    </div>
  );
}

export default Modal;
