import "./dashboard.css";
import axios from "axios";
import  { useState, useEffect } from "react";
import {  useAuthState } from "../../Context";
import NavBar2 from "../Navbar2/Navbar2";
function Home2(props) {
  const userDetails = useAuthState();

  // const [cert, setCert] = useState("");
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

  // function onFileChange(e) {
  //   setCert(e.target.files[0]);
  // }

  console.log(userDetails.user.role);
  return (
    <div className="container">
    <NavBar2/>
      <div className="home-header">Existing Templates</div>
      <div className="img-container">
      {uploadedCerts.map((cert) => (
        <img alt="Certificate"  src={cert.certUrl} className="home-photo" />
      ))}
      </div>
      <div className="adjust">
      </div>
    </div>
  );
}

export default Home2;
