import React, { useState } from "react";
import axios from "axios";

import { signUpUser, useAuthState, useAuthDispatch } from "../../Context";
import Navbar2 from "../Navbar2/Navbar2";
import { AiFillEyeInvisible } from "react-icons/ai";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAuthDispatch();
  var { loading, errorMessage }: any = useAuthState();
  const [visible, setVisible] = useState(false);
  const [successMessage, setSuccessMsg] = useState("");
  const url = "http://localhost:5000";

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("in sugnup");
    try {
      let res = await signUpUser(dispatch, {
        name,
        email,
        password,
        role: "MC",
      });
      if (res === "success") {
        errorMessage = "";
        console.log("res is success time for another request");
        console.log(email);
        setSuccessMsg("Signed up Successfully");
        const data = {
          email,
        };
        axios
          .post(url + "/api/auth/verify", data)
          .then((res: any) =>
            res.data.status === "success"
              ? setSuccessMsg("Please check your mail to verify your account.")
              : console.log(res.data)
          )
          .catch((err) => console.log(err.message));

      }
    } catch (error) {
      console.log(error);
    }
  };
  function toggleVisible(e) {
    e.preventDefault();
    setVisible(!visible);
  }
  return (
    <>
      <div>
        <Navbar2 login={false} signup={true} />
        <div className="main-c">
          <div className="bg-design"></div>
          <div className="login-box">
            <div className="login-h">
              An <span className="blue">in-house</span> certificate generator.
            </div>
            <div>
              {errorMessage ? <p className="error">{errorMessage}</p> : null}

              {successMessage ? (
                <p className="success">{successMessage}</p>
              ) : null}
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
              <div>
                <input
                  className="form-item"
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="form-item"
                  type={visible ? "text" : "password"}
                  placeholder="Enter Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="toggle-button-2"
                  onClick={(e) => toggleVisible(e)}
                >
                  <AiFillEyeInvisible />
                </button>
              </div>
              <button
                className="submit-btn"
                onClick={handleSignUp}
                disabled={loading}
              >
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
