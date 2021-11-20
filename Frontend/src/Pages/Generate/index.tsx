import "../Dashboard/dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import NavBar from "../Navbar";

function Generate(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  function handleLogout() {
    logOut(dispatch);
    props.history.push("/login");
  }

  const [cert, setCert] = useState("");
  const [uploadedCerts, setUploadedCerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cert/")
      .then((res) => {
        console.log(res);
        setUploadedCerts(res.data);
        console.log(uploadedCerts);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
<NavBar/>
      <div className="home-main"></div>
      <div className="home-header">Choose a template</div>

      {uploadedCerts.map((cert) => (
        <Link to={"/single-cert/" + cert._id}>
          <img src={cert.certUrl} className="home-photo" />
        </Link>
      ))}
    </div>
  );
}

export default Generate;
