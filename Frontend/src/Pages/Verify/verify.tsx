import axios from "axios";
import React, { useState, useEffect } from "react";

import Navbar2 from "../Navbar2/Navbar2";

interface Props {}

const Verify = (props) => {
  const current_url = window.location.href;
  const param_array = current_url.split("/");
  const id = param_array[4];
  console.log(id);
  const url = "http://localhost:5000";
  const data = {
    id,
  };

  useEffect(() => {
    axios
      .patch(url + "/api/auth/verifyacc", data)
      .then((res: any) =>
        res.data.status === "success"
          ? (console.log(res.data),
            setMsg("Account Verrified Successfully!"),
            setTimeout(function () {
              window.location.href = "../login";
            }, 2000))
          : setMsg(res.data.error)
      )
      .catch((err) => setMsg(err.message));
  }, []);

  const [msg, setMsg] = useState<string>("");

  return (
    <div>
      <Navbar2 login={false} signup={false} />
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="login-h verify-msg">
          {" "}
          {msg !== "" ? <div>{msg}</div> : null}
        </div>

        {/* <form className="log-form">
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
          </form> */}
      </div>
    </div>
  );
};

export default Verify;
