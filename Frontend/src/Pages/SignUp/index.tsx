import React, { useState } from "react";

import { signUpUser, useAuthState, useAuthDispatch } from "../../Context";
import styles from "./signup.module.css";
import Navbar2 from "../Navbar2/Navbar2";
import { AiFillEyeInvisible } from 'react-icons/ai';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAuthDispatch();
  const { loading, errorMessage }:any = useAuthState();
  const [visible, setVisible] = useState(false);
  
  
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
  function toggleVisible(e){
    e.preventDefault();
    setVisible(!visible);
  }
  return (
    <>
      {/* <div className={styles.container}>
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
      </div> */}
      <div>
        <Navbar2 login={false} signup={true} />
        <div className="main-c">
          <div className="bg-design"></div>
          <div className="login-box">
            <div className="login-h">
              An <span className="blue">in-house</span> certificate generator.
            </div>
            <div>
            {errorMessage ? (
              <p className="error">{errorMessage}</p>
            ) : null}

            {/* {successMessage ? (
              <p className="success">{successMessage}</p>
            ) : null} */}
          </div>

            <form className="log-form">
              <div>
              <input
              className="form-item"
                  type="text"
                  id="text"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />

              </div>
              <div >
                <input
                className="form-item"
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div >
                <input
                className="form-item"
                  type={visible?"text":"password"}
                  placeholder="Enter Password"

                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button  className="toggle-button-2" onClick={(e)=>toggleVisible(e)}><AiFillEyeInvisible/></button>
              </div>
              <button className="submit-btn" onClick={handleSignUp} disabled={loading}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
