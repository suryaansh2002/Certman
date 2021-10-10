import axios from "axios";
import React, { useState } from "react";
import "./Login.css";

interface Props {}

const Login: React.FC<Props> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const url = "http://localhost:5000/";
  // Can replace this url of wherever backend deployed so that dont have
  // to replace it everywhere

  function handleLogin() {
    const data = {
      email,
      password,
    };
    console.log(data);
    axios
      .post(url + "login", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  function handleSignup() {
    const data = {
      name,
      email,
      password,
      role,
    };
    axios
      .post(url + "signup", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data);
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div>
          <div className="toggle-div">
            <button
              className="login-toggler"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className="login-toggler"
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </button>
          </div>
          {showLogin ? (
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
          ) : (
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
              <div className="signup-role">
                <label>You are a: </label>
                <br />
                <div>
                  {" "}
                  <input
                    type="radio"
                    name="role"
                    value="Board"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Board Member
                </div>
                <div>
                  {" "}
                  <input
                    type="radio"
                    name="role"
                    value="MC"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Mancomm Member
                  <br />
                </div>
              </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
