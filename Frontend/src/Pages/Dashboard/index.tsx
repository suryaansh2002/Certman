import "./dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import {Link} from 'react-router-dom';
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
      .post(   "http://localhost:5000/api/cert/cert-upload", formData, {})
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
      <NavBar/>
      {/* <div className="home-top">
        <button onClick={() => handleLogout()} className="logout-button">
          Logout
        </button>
      </div> */}
      <div className="home-main">
        <a className="modal-open" href="#modal">
          {" "}
          <button className="home-button">Upload a new Template</button>
        </a>
        {userDetails.user.role == "Board" && (
          <Link to={"/generate"}>
          <button className="home-button">Generate Certificates</button>
          </Link>
        )}
        <div className="modal" id="modal">
          <div className="modal-content">
            <a
              href="#"
              className="modal-close"
              id="modalClose"
              title="Close Modal"
            >
              X
            </a>
            <h3 className="modal-title">Upload A New Template</h3>
            <div className="modal-area">
              <div className="row">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                  <input
                      className="upload-input"
                      type="file"
                      onChange={onFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <button className="upload-button" type="submit">
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-header">Existing Templates</div>
      {uploadedCerts.map((cert) => (
        <img src={cert.certUrl} className="home-photo" />
      ))}
    </div>
  );
}

export default Home2;
