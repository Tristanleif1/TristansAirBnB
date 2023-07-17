// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [invalidForm, setInvalidForm] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (submitted && (credential.length < 4 || password.length < 6)) {
      setErrors({ credential: "The provided credentials were invalid." });
    } else {
      setErrors({});
    }
  }, [credential, password, submitted]);

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!invalidForm) {
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(() => {
          setErrors({ credential: "The provided credentials were invalid." });
        });
    }
  };

  return (
    <>
      <div className="login-box">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          <button type="submit" disabled={invalidForm}>
            Log In
          </button>
        </form>
        <button
          onClick={() =>
            dispatch(
              sessionActions.login({
                credential: "Demo-lition",
                password: "password",
              })
            ).then(closeModal)
          }
          className="demo-user-link"
        >
          Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
