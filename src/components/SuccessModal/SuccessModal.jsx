import { useEffect } from "react";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        ></button>
        <h2 className="modal__title success-modal__title">
          Registration successfully completed!
        </h2>
        <button
          type="button"
          className="success-modal__signin"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
