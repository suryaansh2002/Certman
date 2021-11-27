import React from "react";
import "./Navbar2.css";
import logo2 from "../../images/logo2.png";
import { Link } from "react-router-dom";

export default function Navbar2(props) {
  return (
    <div className="nav-c">
      <img className="logo2" src={logo2}></img>

      <div className="nav-right">
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
        </Link>
      </div>
    </div>
  );
}
