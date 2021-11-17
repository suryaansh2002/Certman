import React, { useState } from "react";

import { signUpUser, useAuthState, useAuthDispatch } from "../../Context";
import styles from "./signup.module.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAuthDispatch();
  const { loading, errorMessage }:any = useAuthState();

  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      let res = await signUpUser(dispatch, { name, email, password, role: 'MC' });
      if (res == "success") {
        props.history.push("./login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div style={{width:200}}>
          <h1>SignUp Page</h1>
          <div>
            {errorMessage ? (
              <p className={styles.error}>{errorMessage}</p>
            ) : null}
          </div>
          <form>
            <div className={styles.loginForm}>
              <div className={styles.loginFormItem}>
                <label htmlFor="text">Name</label>
                <input
                  type="text"
                  id="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
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
            <button onClick={handleSignUp} disabled={loading}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
