import React from "react";
import Navbar2 from "../Navbar2/Navbar2";
import "./Home.css";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";

export default function Home() {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  return (
    <div>
      <Navbar2 login={false} signup={false} />
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="home-box">
          <div className="c-heading">CERTMAN</div>
          <div className="c-byline">An in-house certificate generator</div>
          {!userDetails.user && (
            <div className="c-more">
              Log in to experience a wide range of features.
            </div>
          )}
        </div>
        {/*
         */}
      </div>
    </div>
  );
}
