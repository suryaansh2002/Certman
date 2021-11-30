import React, { useState, useEffect, useRef } from "react";
import "../Dashboard/dashboard.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";
import Navbar2 from "../Navbar2/Navbar2";
import QRCode from "qrcode";
import qrcode_1 from "../../images/qrcode.png";

export default function SingleImage(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const [link, setLink] = useState("");
  const id = window.location.pathname.split("/")[2];
  QRCode.toDataURL("https://www.google.com/")
    .then((url) => {
      setLink(url);
    })
    .catch((err) => {
      console.error(err);
    });

  // With async/await
  const generateQR = async (text) => {
    try {
      console.log(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  };

  const [csv, setCsv] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [arr2, setArr2] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [coordinates, setCoordinates] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const [csvError, setCsvError] = useState(false);
  const [final, setFinal] = useState(false);
  const [type, setType] = useState("");

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
      .then((response: any) => {
        console.log(response);
        setCertUrl(response.data.certUrl);
        setCoordinates(response.data.coordinates);
        setType(response.data.category);
        setFinal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(id);
    console.log(coordinates);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;

    var background = new Image();
    background.setAttribute("crossOrigin", "anonymous");
    background.src = certUrl;

    background.onload = function () {
      ctx.drawImage(background, 0, 0, 700, 500);
        var img = new Image();
        img.src = qrcode_1;
        console.log(coordinates.qr);
        console.log(typeof img);
        // ctx.drawImage(img, coordinates.qr[1], coordinates.qr[0],coordinates.qr[4],coordinates.qr[3]);
        ctx.drawImage(
          img,
          coordinates.qr[1],
          coordinates.qr[0],
          coordinates.qr[3],
          coordinates.qr[2]
        );
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "black";
      // ctx.drawImage(qr, 20, 422,50,50);
      // ctx.fillText("Personffffff", 200, 200);

      if (type == "wc" || type == "mc") {
        ctx.fillText("Person Name", coordinates.name[1], coordinates.name[0]);
      }
      if (type == "org") {
        ctx.fillText("Person Name", coordinates.name[1], coordinates.name[0]);
        ctx.fillText("Event Name", coordinates.event[1], coordinates.event[0]);
        ctx.fillText("01/01/2021", coordinates.date[1], coordinates.date[0]);
      }
      if (type == "comp") {
        ctx.fillText("Person Name", coordinates.name[1], coordinates.name[0]);
        ctx.fillText("Event Name", coordinates.event[1], coordinates.event[0]);
        ctx.fillText("01/01/2021", coordinates.date[1], coordinates.date[0]);
        ctx.fillText("1st", coordinates.postion[1], coordinates.postion[0]);
      }
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
    for (var i = 0; i < arr2.length; i++) {

      var canvasUrl, canvasBuffer;
      var user = arr2[i]
      console.log("Sending:", user);
      var data = {
        subject,
        content,
        user,
        certUrl,
        type,
        coordinates,
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
      .then((res: any) => {
        setArr2([]);
        setArr2(res.data);
        console.log(res.data);
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
    console.log(arr2);
    arr2.map((element) => {
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

        if (type == "wc" || type == "mc") {
          ctx.fillText(element.name, coordinates.name[1], coordinates.name[0]);
        }
        if (type == "wc" || type == "mc") {
          ctx.fillText(element.name, coordinates.name[1], coordinates.name[0]);
        }
        if (type == "org") {
          ctx.fillText(element.name, coordinates.name[1], coordinates.name[0]);
          ctx.fillText(
            element.event_name,
            coordinates.event[1],
            coordinates.event[0]
          );
          ctx.fillText(element.date, coordinates.date[1], coordinates.date[0]);
        }
        if (type == "comp") {
          ctx.fillText(element.name, coordinates.name[1], coordinates.name[0]);
          ctx.fillText(
            element.event_name,
            coordinates.event[1],
            coordinates.event[0]
          );
          ctx.fillText(element.date, coordinates.date[1], coordinates.date[0]);
          ctx.fillText(
            element.postion,
            coordinates.postion[1],
            coordinates.postion[0]
          );
        }

        var canvas2: any = document.getElementById("myCanvas");
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

      if (type == "wc" || type == "mc") {
        ctx.fillText("Person Name", coordinates.name[1], coordinates.name[0]);
      }
    };
  }
  return (
    <div className="container">
      <Navbar2 />
      <div className="row">
        <a className="modal-open" href="#modal">
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
                  Sent {emailCount}/{arr2.length} mails
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
      <div>
        {(type == "wc" || type == "mc") && (
          <div>
            The csv uploaded should contain 2 columns only, one column with
            heading <b>name</b> and one with heading <b>email</b>.{" "}
          </div>
        )}
        {type == "org" && (
          <div>
            The csv uploaded should contain 4 columns only, with headings-{" "}
            <b>name</b>, <b>email</b>,<b>event_name</b>,<b>date</b>.{" "}
          </div>
        )}
        {type == "comp" && (
          <div>
            The csv uploaded should contain 5 columns only, with headings-{" "}
            <b>name</b>, <b>email</b>,<b>event_name</b>,<b>date</b>,
            <b>postion</b>.{" "}
          </div>
        )}
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
