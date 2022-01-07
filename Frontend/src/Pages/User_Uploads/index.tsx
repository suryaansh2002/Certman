import { useState, useEffect } from "react";
import { useAuthState } from "../../Context";
import "./user_upload.css";
import axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";

export default function User_Upload() {
  const userDetails = useAuthState();

  const [uploadedCerts, setUploadedCerts] = useState([]);
  const user_id = userDetails.user.id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cert/")
      .then((res) => {
        console.log(res);
        setUploadedCerts(res.data);
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
    <div className="container">
      <Navbar2 />
      <div className="user-name">{userDetails.user.name}</div>
      <div className="user-email">{userDetails.user.email}</div>
      <div className="map-c">
        {user_array.map((cert) => (
          <div className="up-container">
            <img alt="certficate" src={cert.certUrl} className="home-photo" />
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
