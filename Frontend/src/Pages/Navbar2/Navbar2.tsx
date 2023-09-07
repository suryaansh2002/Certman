import React, { useState } from "react";
import "./Navbar2.css";
import logo2 from "../../images/logo2.png";
import s from "../../images/S.png";

import { Link } from "react-router-dom";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import user from "../../images/logo22.png";

export default function Navbar2(props) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const handleLogout = () => {
    logOut(dispatch);
    window.location.href = "/home";
  }; //relative to domain  };
  const { loading, errorMessageLog, errorMessageSign, successMessage }: any =
    useAuthState();

  return (
    <div className="nav-c">
      <img className="logo2" src={logo2} alt="logo"></img>
      <div className="b">
        <Link className="certman" to={"/home"}>
          CERTMAN
        </Link>
      </div>

      {/* {props.login || props.signup ? (
        <div className="b">
          <Link className="certman" to={"/home"}>
            CERTMAN
          </Link>
        </div>
      ) : userDetails.user ? (
        <div className="b2">
          <img className="s" src={s} alt="logo"></img>
          <div className="b">
          <Link className="certman" to={"/home"}>
            CERTMAN
          </Link>
        </div>
          <div className="s-c">
            {" "}
            <Link className="certman2" to={"/dashboard"}>
              CERTMAN
            </Link>
          </div>
        </div>
      ) : (
        <div>
           <div className="b">
          <Link className="certman" to={"/home"}>
            CERTMAN
          </Link>
        </div>
          <img className="logo2" alt="logo2" src={logo2}></img>
        </div>
      )} */}

      <div className="nav-right">
        {userDetails.user ? (
          <div className="right-container">
            <button
              className="icon-btn"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <img alt="icon" src={user} className="user-icon"></img>
            </button>
          </div>
        ) : (
          <div>
            {" "}
            <Link
              to={"/login"}
              className={props.login ? "nav-link nav-active" : "nav-link"}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className={props.signup ? "nav-active-2 nav-link" : "nav-link"}
            >
              Sign up
            </Link>{" "}
          </div>
        )}
      </div>
      {toggle && (
        <div className="toggle-div">
          <div>
            <Link className="toggle-item" to={"/user_upload"}>
              Your Uploads
            </Link>
          </div>
          <div>
            <Link to={"/upload"} className="toggle-item">
              Upload a new Template{" "}
            </Link>
          </div>
          {userDetails.user.role === "Board" && (
            <div>
              <Link className="toggle-item" to={"/generate"}>
                Generate Certificates{" "}
              </Link>
            </div>
          )}
          <div>
            <button className="logout-btn" onClick={() => handleLogout()}>
              <Link className="toggle-item"> Logout</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
