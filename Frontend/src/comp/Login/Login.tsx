import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";

import { AiFillEye } from "react-icons/ai";

interface Props {
  cookie: any;
  setCookie: any;
}

const Login: React.FC<Props> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [suError, setSUError] = useState<boolean>(false);
  const [suSucess, setSUSuccess] = useState<boolean>(false);
  const [suMsg, setSUMsg] = useState<string>("");
  const [logError, setLogError] = useState<boolean>(false);
  const [logSucess, setLogSuccess] = useState<boolean>(false);
  const [logMsg, setLogMsg] = useState<string>("");

  const url = "http://localhost:5000";
  // Can replace this url of wherever backend deployed so that dont have
  // to replace it everywhere
  let history = useHistory();

  function handleLogin() {
    const data = {
      email,
      password,
    };
    console.log(data);
    axios
      .post(url + "/api/auth/login", data)
      .then((res: any) =>
        res.data.status === "error"
          ? (setLogMsg(res.data.error), setLogError(true))
          : res.data.status === "success"
          ? (setLogMsg("Logged in Sucessfully"),
            props.setCookie("user", res.data.data),
            setLogError(false),
            setLogSuccess(true),
            setTimeout(() => {
              history.push(`/home`);
            }, 1000))
          : null
      )
      .catch((err) => console.log(err.message));
  }
  function handleSignup() {
    const data = {
      name,
      email,
      password,
      role: "MC",
    };
    axios
      .post(url + "/api/auth/signup", data)
      .then((res: any) =>
        res.data.status === "error"
          ? (setSUMsg(res.data.error), setSUError(true))
          : res.data.status === "success"
          ? (setSUMsg(
              "Signed up successfully, please check your email for verification link"
            ),
            setSUError(false),
            setSUSuccess(true))
          : null
      )
      .catch((err) => console.log(err.message));

    console.log(data);
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div>
          <div className="toggle-div">
            <button
              className={
                showLogin ? "login-toggler visible-header" : "login-toggler"
              }
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={
                showLogin ? "login-toggler" : "login-toggler visible-header"
              }
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </button>
          </div>
          {showLogin ? (
            <div>
              {logMsg !== "" ? (
                <div
                  className={
                    logError ? "failure" : logSucess ? "success" : "no_class"
                  }
                >
                  {logMsg}
                </div>
              ) : null}

              <form>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>

                <div className="forgot">
                  <Link id="forgot" to={"/forgot"}>
                    Forgot Password
                  </Link>
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div>
              {suMsg !== "" ? (
                <div
                  className={
                    suError ? "failure" : suSucess ? "success" : "no_class"
                  }
                >
                  {suMsg}
                </div>
              ) : null}

              <form>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>

                <input
                  type="email"
                  className="login-input"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>

                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                {/* <div className="signup-role">
                  <select name="role" onChange={(e)=>setRole(e.target.value)}>
                    <option value="">Select Your Position</option>
                    <option value="Board">Board</option>
                    <option value="MC">Management Committee</option>
                  </select>

                </div> */}
                <button
                  type="submit"
                  className="submit-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignup();
                  }}
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
