import React, { useState, useEffect, useRef } from "react";
import "../Dashboard/dashboard.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";

export default function SingleImage(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const id = window.location.pathname.split('/')[2];

  const [csv, setCsv] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [arr, setArr] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [coordinates, setCoordinates] = useState([]);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const [csvError, setCsvError] = useState(false);
  const [final, setFinal] = useState(false);

  const canvasRef = useRef(null);

  const handleLogout = () => {
    logOut(dispatch);
    props.history.push("/login");
  };

  function onFileChange(e) {
    setCsv(e.target.files[0]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cert/" + id)
      .then((response:any) => {
        console.log(response);
        console.log("jrr;;;oo");
        setCertUrl(response.data.certUrl);
        setCoordinates(response.data.coordinates);
        setFinal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("This fucker ran");
    console.log(id)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;

    var background = new Image();
    background.setAttribute("crossOrigin", "anonymous");
    background.src = certUrl;

    background.onload = function () {
      ctx.drawImage(background, 0, 0, 700, 500);

      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "black";

      ctx.fillText("Person Name", 280, 300);
    };
  }, [final]);

  const emailHandler = async (e) => {
    if (csv == "") {
      setCsvError(true);
      alert("No csv uploaded!");
      return;
    }
    e.preventDefault();
    console.log("hello");

    console.log(arr);
    setShow(true);
    console.log(certUrl);
    function toBuffer(ab) {
      var buf = Buffer.alloc(ab.byteLength);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
      }
      return buf;
    }
    for (var i = 0; i < arr.length; i++) {
      var canvasUrl, canvasBuffer;
      var user = arr[i];
      console.log("Sending:", user);
      const elementCanvas = document.createElement("canvas");
      elementCanvas.setAttribute("ref", user.name);
      const canvasObj = canvasRef.current;
      const ctx = canvasObj.getContext("2d");
      canvasObj.width = 700;
      canvasObj.height = 500;

      var background = new Image();
      background.setAttribute("crossOrigin", "anonymous");
      background.src = certUrl;

      background.onload = function () {
        ctx.drawImage(background, 0, 0, 700, 500);

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";

        ctx.fillText(user.name, 280, 300);
        var canvas2 = document.getElementById("myCanvas");
        // var imageData = ctx.getImageData(0, 0, 700, 500);
        // canvasUrl = imageData.data.buffer
        // canvasBuffer=toBuffer(canvasUrl)
        // console.log(canvasUrl)
      };
      var data = {
        subject,
        content,
        user,
        certUrl,
      };
      await axios
        .post("http://localhost:5000/api/sendmail/cert/", data)
        .then((res) => (console.log(res.data), setEmailCount((c) => c + 1)))
        .catch((err) => console.log(err.message));
    }
    setShow(false);
  };

  const onSubmit = async (e) => {
    if (csv == "") {
      setCsvError(true);
      alert("No csv uploaded!");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("csv", csv);

    await axios
      .post("http://localhost:5000/api/csv/csv-upload", formData, {})
      .then((res:any) => {
        setArr(res.data);
        const modalClose = document.getElementById("modalClose");
        modalClose.click();
      });
  };

  function download() {
    if (csv == "") {
      setCsvError(true);
      alert("No csv uploaded!");
      return;
    }
    console.log(arr);
    arr.map((element) => {
      const elementCanvas = document.createElement("canvas");
      elementCanvas.setAttribute("ref", element.name);
      const canvasObj = canvasRef.current;
      const ctx = canvasObj.getContext("2d");
      canvasObj.width = 700;
      canvasObj.height = 500;

      var background = new Image();
      background.setAttribute("crossOrigin", "anonymous");
      background.src = certUrl;

      background.onload = function () {
        ctx.drawImage(background, 0, 0, 700, 500);

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";

        ctx.fillText(element.name, 280, 300);
        var canvas2:any = document.getElementById("myCanvas");
        var url = canvas2.toDataURL("image/png");

        var link = document.createElement("a");
        link.download = `${element.name}.png`;
        link.href = url;
        link.click();
      };
    });
    const elementCanvas = document.createElement("canvas");
    elementCanvas.classList.add("hide-canvas");

    elementCanvas.setAttribute("ref", "canvasRef");
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    canvasObj.width = 700;
    canvasObj.height = 500;

    var background = new Image();
    background.setAttribute("crossOrigin", "anonymous");
    background.src = certUrl;

    background.onload = function () {
      ctx.drawImage(background, 0, 0, 700, 500);

      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "black";

      ctx.fillText("Person Name", 280, 300);
    };
  }
  return (
    <div className="container">
      <div className="home-top">
        <Link to={"/home"}>
          {" "}
          <button className="home-button-2">Back To Home</button>
        </Link>

        <button onClick={() => handleLogout()} className="logout-button">
          Logout
        </button>
      </div>

      <div className="row">
        <a className="modal-open" href="#modal">
          {" "}
          <button className="home-button">Upload CSV File</button>
        </a>
        <button className="home-button" onClick={download}>
          Download All
        </button>
        <a className="modal-open" href="#modal2">
          <button className="home-button">Mail Certifcates</button>
        </a>
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
            <h3 className="modal-title">Upload CSV File</h3>
            <div className="modal-area">
              <div className="row">
                <form onSubmit={onSubmit} id="csvForm">
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

        <div className="modal" id="modal2">
          <div className="modal-content">
            <a
              href="#"
              className="modal-close"
              id="modalClose"
              title="Close Modal"
            >
              X
            </a>
            <h3 className="modal-title">Mail Certificates</h3>
            <div className="modal-area">
              {show ? (
                <div className="count">
                  Sending mails... <br />
                  Sent {emailCount}/{arr.length} mails
                </div>
              ) : null}
              <div className="row">
                <form onSubmit={emailHandler}>
                  <div className="form-group">
                    <div>
                      <input
                        className="mail-input"
                        placeholder="Enter Subject"
                        required
                        type="text"
                        onChange={(e) => setSubject(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <input
                        className="mail-input"
                        placeholder="Enter Content For Mail"
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="upload-button" type="submit">
                      Send Mail
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          id="myCanvas"
          className="cnvas2"
          width="700"
          height="200"
        ></canvas>
      </div>
    </div>
  );
}
