import React from "react";
import Navbar2 from "../Navbar2/Navbar2";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <Navbar2 login={false} signup={false} />
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="home-box">
        <div className="c-heading">CERTMAN</div>
        <div className="c-byline">An in-house certificate generator</div>
        <div className="c-more">
          Log in to experience a wide range of features.
        </div> 
        </div>
        {/* 
*/}
      </div>
    </div>
  );
}
