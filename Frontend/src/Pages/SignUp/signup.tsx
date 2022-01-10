import React, { useState } from "react";
import axios from "axios";

import { signUpUser, useAuthState, useAuthDispatch } from "../../Context";
import Navbar2 from "../Navbar2/Navbar2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmpass, setcnfrmPassword] = useState("");

  const [name, setName] = useState("");

  const dispatch = useAuthDispatch();
  var { loading, errorMessageLog, errorMessageSign }: any = useAuthState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

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
        errorMessageSign = "";
        console.log("res is success time for another request");
        console.log(email);
        setSuccessMsg("Signed up Successfully");
        const data = {
          email,
        };
        console.log("Sending verify request")
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
  function toggleVisible2(e) {
    e.preventDefault();
    setVisible2(!visible2);
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
              {errorMessageSign ? (
                <p className="error">{errorMessageSign}</p>
              ) : null}

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
                  {!visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              <div>
                <input
                  className="form-item"
                  type={visible2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  id="password"
                  value={cnfrmpass}
                  onChange={(e) => setcnfrmPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="toggle-button-3"
                  onClick={(e) => toggleVisible2(e)}
                >
                  {!visible2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {cnfrmpass !== password && (
                <div className="match">Passwords do not match</div>
              )}
              <button
                className="submit-btn"
                onClick={handleSignUp}
                disabled={loading || cnfrmpass !== password}
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
