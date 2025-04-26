import * as React from "react";
import Modal from "@mui/material/Modal";

export default function BasicModal({ open, handleClose, children, className }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-white border-2 border-black shadow-xl p-4 
                      max-w-[95%] w-auto max-h-[90vh] overflow-auto rounded-2xl ${className || ""}`}
        >
          {children}
        </div>
      </Modal>
    </div>
  );
}