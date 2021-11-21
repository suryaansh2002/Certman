import React, { useState, useEffect } from "react";

import { loginUser, useAuthState, useAuthDispatch } from "../../Context";
import styles from "./login.module.css";
import Navbar2 from "../Navbar2/Navbar2";
import "./login.css";
import { AiFillEyeInvisible } from 'react-icons/ai';
import {Link} from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);


  const dispatch = useAuthDispatch();
  const { loading, errorMessage, successMessage }: any = useAuthState();

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
function toggleVisible(e){
  e.preventDefault();
  setVisible(!visible);
}
  return (
    <>
      <div>
        <Navbar2 login={true} signup={false} />
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

            {successMessage ? (
              <p className="success">{successMessage}</p>
            ) : null}
          </div>

            <form className="log-form">
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
                <button  className="toggle-button" onClick={(e)=>toggleVisible(e)}><AiFillEyeInvisible/></button>
              </div>
              <button className="submit-btn" type="submit" onClick={handleLogin} disabled={loading}>
                Login
              </button>
              <div className="forgot"><Link to={"/forgot"} className="f-link">Forgot Password?</Link></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
