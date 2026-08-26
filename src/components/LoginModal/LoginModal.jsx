import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
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
    onLogin(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign in"
      submitText="Sign in"
      isSubmitDisabled={!isValid}
      altAction={{ text: "Sign up", onClick: onSwitchToRegister }}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>
      <input
        id="login-email"
        name="email"
        type="email"
        className="modal__input"
        placeholder="Enter email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <span className="modal__error">{errors.email}</span>
      <label className="modal__label" htmlFor="login-password">
        Password
      </label>
      <input
        id="login-password"
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
    </ModalWithForm>
  );
}

export default LoginModal;
