import axios from "axios";
import React, { useState } from "react";
import "./Forgot.css";
import Navbar2 from "../Navbar2/Navbar2";

interface Props {}

const ForgotPassword: React.FC<Props> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [err, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const url = "http://localhost:5000";

  function handleSubmit() {
    const data = {
      email,
    };
    console.log(data);

    axios
      .post(url + "/api/auth/forgot", data)
      .then((res: any) =>
        res.data.status === "error"
          ? (setError(true), setMsg(res.data.error))
          : res.data.status === "success"
          ? (setError(false),
            setSuccess(true),
            setMsg("Mail with password reset link has been sent."))
          : null
      )
      .catch((err) => console.log(err.message));

    console.log(data);
  }

  return (
    <div>
      <Navbar2 login={false} signup={false} />
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="login-box box-2">
          <div className="login-h">Forgot Password</div>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email id"
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

export default ForgotPassword;
