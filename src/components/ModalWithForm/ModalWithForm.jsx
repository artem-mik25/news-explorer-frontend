import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText,
  isSubmitDisabled,
  serverError,
  altAction,
  children,
}) {
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
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          {serverError && (
            <span className="modal__server-error">{serverError}</span>
          )}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {submitText}
          </button>
        </form>
        {altAction && (
          <p className="modal__alt">
            or{" "}
            <button
              type="button"
              className="modal__alt-button"
              onClick={altAction.onClick}
            >
              {altAction.text}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
