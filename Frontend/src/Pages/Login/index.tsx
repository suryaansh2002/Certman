import React, { useState, useEffect } from "react";

import { loginUser, useAuthState, useAuthDispatch } from "../../Context";
import styles from "./login.module.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();
  const { loading, errorMessage, successMessage }:any = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await loginUser(dispatch, { email, password });
      let user = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).name
        : "";
      if (user) {
        props.history.push("/dashboard");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div style={{width:200}}>
          <h1>Login Page</h1>
          <div>
            {errorMessage ? (
              <p className={styles.error}>{errorMessage}</p>
            ) : null}

            {successMessage ? (
              <p className={styles.success}>{successMessage}</p>
            ) : null}
          </div>
          <form>
            <div className={styles.loginForm}>
              <div className={styles.loginFormItem}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className={styles.loginFormItem}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <button onClick={handleLogin} disabled={loading}>
              login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
