import axios from "axios";
import React, { useState } from "react";
import "./Forgot.css";
import { Link } from "react-router-dom";

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
        res.data.status == "error"
          ? (setError(true), setMsg(res.data.error))
          : res.data.status == "success"
          ? (setError(false),
            setSuccess(true),
            setMsg("Mail with password reset link has been sent."))
          : null
      )
      .catch((err) => console.log(err.message));

    console.log(data);
  }

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="forgot-header">Forgot Password</div>
        {msg !== "" ? (
          <div className={err ? "failure" : success ? "success" : "no-class"}>
            {msg}
          </div>
        ) : null}
        <form>
          <input
            type="email"
            className="forgot-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email id"
          ></input>
          <button
            type="submit"
            className="forgot-submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
        <div className="back-div">
          <Link to={"/"} id="back">
            Back To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
