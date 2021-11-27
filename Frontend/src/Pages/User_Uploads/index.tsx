import React, { useState, useEffect } from "react";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import { Link } from "react-router-dom";
import NavBar from "../Navbar";
import "./user_upload.css";
import axios from "axios";

export default function User_Upload() {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const [cert, setCert] = useState("");
  const [uploadedCerts, setUploadedCerts] = useState([]);
  const user_id = userDetails.user.id;

  const handleLogout = (props) => {
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

  const user_array = uploadedCerts.filter((cert) => cert.userId === user_id);
  function handleDelete(id) {
    axios
      .delete("http://localhost:5000/api/cert/" + id)
      .then((res) => window.location.reload());
  }
  return (
    <div>
      <NavBar />
      <div className="user-name">{userDetails.user.name}</div>
      <div className="user-email">{userDetails.user.email}</div>
      <div className="map-c">
        {user_array.map((cert) => (
          <div className="up-container">
            <img src={cert.certUrl} className="upload-photo" />
            <div>
              <button
                className="cert-delete"
                onClick={(e) => handleDelete(cert._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
