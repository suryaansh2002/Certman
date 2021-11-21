import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../images/iecse_logo.svg";
import user from "../../images/user_icon.png";
import { Link } from "react-router-dom";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";

export default function NavBar(props) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const handleLogout = () => {
    logOut(dispatch);
    window.location.href = '/home';
    
    } //relative to domain  };

  return (
    <>
      <div className="nav-container">
        <div className="left-container">
          <Link to={"/dashboard"}>
            <img src={logo} />
          </Link>
          <span className="cert-h">Certman</span>
        </div>
        <div className="right-container">
          <button className="icon-btn" onClick={() => setToggle(!toggle)}>
            <img src={user} className="user-icon"></img>
          </button>
        </div>
      </div>
      {toggle && (
        <div className="toggle-div">
          <div>
            <Link className="toggle-item" to={"/user_upload"}>Your Uploads</Link>
          </div>
          <div>
            <Link to={"/upload"} className="toggle-item">Upload a new Template </Link>
          </div>
          {userDetails.user.role == "Board" && (
            <div>
              <Link className="toggle-item" to={"/generate"}>Generate Certificates </Link>
            </div>
          )}
          <div>
            <button className="logout-btn" onClick={()=>handleLogout()}>
            <Link className="toggle-item"> Logout</Link>
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
