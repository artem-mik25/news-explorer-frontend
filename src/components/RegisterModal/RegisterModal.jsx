import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({ isOpen, onClose, onRegister, serverError, onSwitchToLogin }) {
  const [values, setValues] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(evt.target.closest("form").checkValidity());
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      submitText="Sign up"
      isSubmitDisabled={!isValid}
      serverError={serverError}
      altAction={{ text: "Sign in", onClick: onSwitchToLogin }}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
      </label>
      <input
        id="register-email"
        name="email"
        type="email"
        className="modal__input"
        placeholder="Enter email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <span className="modal__error">{errors.email}</span>
      <label className="modal__label" htmlFor="register-password">
        Password
      </label>
      <input
        id="register-password"
        name="password"
        type="password"
        className="modal__input"
        placeholder="Enter password"
        value={values.password}
        onChange={handleChange}
        minLength="2"
        required
      />
      <span className="modal__error">{errors.password}</span>
      <label className="modal__label" htmlFor="register-name">
        Username
      </label>
      <input
        id="register-name"
        name="name"
        type="text"
        className="modal__input"
        placeholder="Enter your username"
        value={values.name}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="modal__error">{errors.name}</span>
    </ModalWithForm>
  );
}

export default RegisterModal;
