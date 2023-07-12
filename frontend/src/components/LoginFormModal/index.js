// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (credential.length < 4 || password.length < 6) {
      setErrors({ credential: "The provided credentials were invalid." });
      return;
    }

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(() => {
        setErrors({ credential: "The provided credentials were invalid." });
      });
  };

  const InvalidForm = credential.length < 4 || password.length < 6;

  return (
    <>
      <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential || ""}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          <button type="submit" disabled={InvalidForm}>
            Log In
          </button>
        </form>
        <button
          type="button"
          onClick={() =>
            dispatch(
              sessionActions.login({
                credential: "Demo-lition",
                password: "password",
              })
            ).then(closeModal)
          }
        >
          Log In as Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
