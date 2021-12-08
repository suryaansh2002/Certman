import "../Dashboard/dashboard.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
// import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import NavBar2 from "../Navbar2/Navbar2";

function Generate(props) {
 

  const [uploadedCerts, setUploadedCerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cert/")
      .then((res) => {
        setUploadedCerts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <NavBar2 />
      <div className="home-header">Choose a template</div>
      <div className="img-container">
        {uploadedCerts.map((cert) => (
          <Link to={"/single-cert/" + cert._id}>
            <img alt="certificate" src={cert.certUrl} className="home-photo" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Generate;
