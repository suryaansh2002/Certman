import axios from "axios";
import React, { useState } from "react";
import "./Forgot.css";

import Navbar2 from "../Navbar2/Navbar2";

interface Props {}

const ResetPassword: React.FC<Props> = (props) => {
  const current_url = window.location.href;
  const param_array = current_url.split("/");
  const id = param_array[4];
  const token = param_array[5];

  const url = "http://localhost:5000";

  const [pass, setPass] = useState<string>("");
  const [err, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  function handleSubmit() {
    const data = {
      id,
      token,
      pass,
    };

    axios
      .patch(url + "/api/auth/reset", data)
      .then(
        (res: any) =>
          (res.data.status = "success"
            ? (setError(false),
              setSuccess(true),
              setMsg("Password Updated Successfully"))
            : null)
      )
      .catch((err) => console.log(err.message));

    console.log(data);
  }
  return (
    // <div className="forgot-container">
    //   <div className="forgot-box">
    //     <div className="forgot-header">Reset Password</div>
    //     {msg !== "" ? (
    //       <div className={err ? "failure" : success ? "success" : "no-class"}>
    //         {msg}
    //       </div>
    //     ) : null}

    //     <form>
    //       <input
    //         type="text"
    //         className="forgot-input"
    //         onChange={(e) => setPass(e.target.value)}
    //         placeholder="Enter new password"
    //       ></input>
    //       <button
    //         type="submit"
    //         className="forgot-submit"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           handleSubmit();
    //         }}
    //       >
    //         Submit
    //       </button>
    //     </form>
    //     <div className="back-div">
    //       <Link to={"/"} id="back">
    //         Back To Login
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div>
      <Navbar2 login={false} signup={false} />
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="login-box box-2">
          <div className="login-h">Reset Password</div>
          <div>
            {msg !== "" ? (
              <div
                className={err ? "failure" : success ? "success" : "no-class"}
              >
                {msg}
              </div>
            ) : null}
          </div>

          <form className="log-form">
            <div>
              <input
                className="form-item"
                type="email"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <button
              className="submit-btn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
