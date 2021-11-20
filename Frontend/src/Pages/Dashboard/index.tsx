import "./dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import { Link } from "react-router-dom";
import NavBar from "../Navbar";
function Home2(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const [cert, setCert] = useState("");
  const [uploadedCerts, setUploadedCerts] = useState([]);

  const handleLogout = () => {
    logOut(dispatch);
    props.history.push("/login");
  };

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
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("certUrl", cert);
    console.log(formData);
    await axios
      .post("http://localhost:5000/api/cert/cert-upload", formData, {})
      .then((res) => {
        console.log(res);

        //post
        //route??
      });
    const modalClose = document.getElementById("modalClose");
    modalClose.click();
    window.location.reload();
  };

  function onFileChange(e) {
    setCert(e.target.files[0]);
  }

  console.log(userDetails.user.role);
  return (
    <div className="container">
      <NavBar />

      <div className="home-header">Existing Templates</div>
      {uploadedCerts.map((cert) => (
        <img src={cert.certUrl} className="home-photo" />
      ))}
    </div>
  );
}

export default Home2;
