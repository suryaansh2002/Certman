import React, { useState, useEffect, useRef } from "react";
import "../Dashboard/dashboard.css";
import axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import QRCode from "qrcode";
import qrcode_1 from "../../images/qrcode.png";
import "./singlecert.css";
import sig from "../../images/sig.png";
import uploadImg from "../../images/upload_icon.png";
import downloadImg from "../../images/download_icon.png";
import mailImg from "../../images/mail_icon.png";
import mailBtn from "../../images/mail_btn_img.png";
import uploadBtn from "../../images/uploadBtn.png";

export default function SingleImage(props) {
  const id = window.location.pathname.split("/")[2];
  QRCode.toDataURL("https://www.google.com/")
    .then((url) => {
      // setLink(url);
    })
    .catch((err) => {
      console.error(err);
    });

  // With async/await

  const [csv, setCsv] = useState("");
  const [facSign, setFacSign] = useState("");
  const [chairSign, setChairSign] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [arr2, setArr2] = useState<any>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [coordinates, setCoordinates] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const [final, setFinal] = useState(false);
  const [type, setType] = useState("");
  const [faUrl, setFaUrl] = useState<any>();
  const [cpUrl, setCpUrl] = useState<any>();

  const canvasRef = useRef(null);

  function onCsvChange(e) {
    console.log(e.target.files[0]);
    setCsv(e.target.files[0]);
  }
  function onChairChange(e) {
    console.log(e.target.files[0]);
    setChairSign(e.target.files[0]);
  }
  function onFacChange(e) {
    console.log(e.target.files[0]);
    setFacSign(e.target.files[0]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cert/")
      .then((response: any) => {
        var certificate = response.data.filter((cert) => cert._id == id);
        certificate = certificate[0];
        console.log(certificate);
        setCertUrl(certificate.certUrl);
        setCoordinates(certificate.coordinates);
        setType(certificate.category);
        setFinal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;

    var background = new Image();
    // background.setAttribute("crossOrigin", "anonymous");
    console.log(certUrl);
    background.src = certUrl;

    background.onload = function () {
      console.log(coordinates);
      ctx.drawImage(background, 0, 0, 700, 500);
      var img = new Image();
      img.src = qrcode_1;
      img.onload = function () {
        ctx.drawImage(
          img,
          coordinates.qr[1],
          coordinates.qr[0],
          coordinates.qr[3],
          coordinates.qr[2]
        );
      };

      var SIG2 = new Image();
      SIG2.src = sig;
      SIG2.onload = function () {
        ctx.drawImage(
          SIG2,
          coordinates.faSig[1],
          coordinates.faSig[0],
          coordinates.faSig[3],
          coordinates.faSig[2]
        );
      };

      var SIG1 = new Image();

      SIG1.src = sig;
      SIG1.onload = function () {
        ctx.drawImage(
          SIG1,
          coordinates.cpSig[1],
          coordinates.cpSig[0],
          coordinates.cpSig[3],
          coordinates.cpSig[2]
        );
      };

      ctx.font = "20px Arial ";

      ctx.fillStyle = coordinates.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      // ctx.drawImage(qr, 20, 422,50,50);
      // ctx.fillText("Personffffff", 200, 200);

      if (type === "wc" || type === "mc") {
        ctx.font = coordinates.name[3].toString() + "px" + " Arial";

        ctx.textAlign = "center";
        ctx.fillText(
          "Person Name",
          coordinates.name[1] + coordinates.name[2] / 2,
          coordinates.name[0]
        );
      }
      if (type === "org") {
        ctx.font = coordinates.name[3].toString() + "px" + " Arial";

        ctx.textAlign = "center";
        ctx.fillText(
          "Person Name",
          coordinates.name[1] + coordinates.name[2] / 2,
          coordinates.name[0]
        );

        ctx.font = coordinates.event[3].toString() + "px" + " Arial";
        ctx.fillText(
          "in Event Name held on",
          coordinates.event[1] + coordinates.event[2] / 2,
          coordinates.event[0]
        );
        ctx.font = coordinates.date[3].toString() + "px" + " Arial";

        ctx.fillText(
          "01/01/2021",
          coordinates.date[1] + coordinates.date[2] / 2,
          coordinates.date[0]
        );
      }
      if (type === "comp") {
        ctx.textAlign = "center";
        ctx.font = coordinates.name[3].toString() + "px" + " Arial";

        ctx.fillText(
          "Person Name",
          coordinates.name[1] + coordinates.name[2] / 2,
          coordinates.name[0]
        );
        ctx.font = coordinates.event[3].toString() + "px" + " Arial";

        ctx.fillText(
          "Event Name",
          coordinates.event[1] + coordinates.event[2] / 2,
          coordinates.event[0]
        );
        ctx.font = coordinates.date[3].toString() + "px" + " Arial";

        ctx.fillText(
          "01/01/2021",
          coordinates.date[1] + coordinates.date[2] / 2,
          coordinates.date[0]
        );
        ctx.font = coordinates.position[3].toString() + "px" + " Arial";

        ctx.fillText(
          "1st",
          coordinates.position[1] + coordinates.position[2] / 2,
          coordinates.position[0]
        );
      }
    };
  }, [final]);

  const emailHandler = async (e) => {
    if (csv === "") {
      alert("No csv uploaded!");
      return;
    }
    e.preventDefault();
    console.log("hello");

    setShow(true);
    // for (var i = 0; i < arr2.length; i++) {

    //   var user = arr2[i]
    //   console.log("Sending:", user);
    var data = {
      subject,
      content,
      arr2,
      certUrl,
      type,
      coordinates,
      faUrl,
      cpUrl,
    };
    await axios
      .post("http://localhost:5000/api/sendmail/cert/", data)
      .then((res) => {
        setEmailCount((c) => c + 1);
        console.log(res);
      })
      .catch((err) => console.log(err.message));

    setShow(false);
  };

  let one = "http://localhost:5000/api/csv/csv-upload";
  let two = "http://localhost:5000/api/csv/upload-facsign";
  let three = "http://localhost:5000/api/csv/upload-chairsign";

  const onSubmit = async (e) => {
    if (csv === "" || facSign === "" || chairSign === "") {
      alert("Please upload everything!");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("csv", csv);

    const requestOne = axios.post(one, formData, {});

    formData.delete("csv");
    formData.append("facSign", facSign);
    const requestTwo = axios.post(two, formData, {});
    formData.delete("facSign");
    formData.append("chairSign", chairSign);
    const requestThree = axios.post(three, formData, {});

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];

          setArr2(responseOne.data);
          console.log(responseOne.data);
          console.log(responseTwo.data);
          console.log(responseThree.data);

          setCpUrl(responseTwo.data);
          setFaUrl(responseThree.data);
        })
      )
      .catch((errors) => {
        // react on errors.
      });

    const modalClose = document.getElementById("modalClose");
    modalClose.click();
  };

  function download() {
    if (csv === "") {
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
      background.onload = async function () {
        ctx.drawImage(background, 0, 0, 700, 500);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = coordinates.color;
        var img = new Image();
        img.src = qrcode_1;
        img.crossOrigin = "anonymous";
        img.onload = function () {
          ctx.drawImage(
            img,
            coordinates.qr[1],
            coordinates.qr[0],
            coordinates.qr[3],
            coordinates.qr[2]
          );
          var SIG2 = new Image();
          SIG2.src = faUrl;
          SIG2.crossOrigin = "anonymous";
          SIG2.onload = function () {
            ctx.drawImage(
              SIG2,
              coordinates.faSig[1],
              coordinates.faSig[0],
              coordinates.faSig[3],
              coordinates.faSig[2]
            );
            var SIG1 = new Image();
            SIG1.src = cpUrl;
            SIG1.crossOrigin = "anonymous";
            SIG1.onload = function () {
              ctx.drawImage(
                SIG1,
                coordinates.cpSig[1],
                coordinates.cpSig[0],
                coordinates.cpSig[3],
                coordinates.cpSig[2]
              );

              if (type === "wc" || type === "mc") {
                ctx.font = coordinates.name[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.name,
                  coordinates.name[1] + coordinates.name[2] / 2,
                  coordinates.name[0]
                );
              }

              if (type === "org") {
                ctx.font = coordinates.name[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.name,
                  coordinates.name[1] + coordinates.name[2] / 2,
                  coordinates.name[0]
                );

                ctx.font = coordinates.event[3].toString() + "px" + " Arial";
                ctx.fillText(
                  element.event,
                  coordinates.event[1] + coordinates.event[2] / 2,
                  coordinates.event[0]
                );
                ctx.font = coordinates.date[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.event_date,
                  coordinates.date[1] + coordinates.date[2] / 2,
                  coordinates.date[0]
                );
              }
              if (type === "comp") {
                ctx.font = coordinates.name[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.name,
                  coordinates.name[1] + coordinates.name[2] / 2,
                  coordinates.name[0]
                );
                ctx.font = coordinates.event[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.event,
                  coordinates.event[1] + coordinates.event[2] / 2,
                  coordinates.event[0]
                );
                ctx.font = coordinates.date[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.event_date,
                  coordinates.date[1] + coordinates.date[2] / 2,
                  coordinates.date[0]
                );
                ctx.font = coordinates.position[3].toString() + "px" + " Arial";

                ctx.fillText(
                  element.position,
                  coordinates.position[1] + coordinates.position[2] / 2,
                  coordinates.position[0]
                );
              }

              var canvas2: any = document.getElementById("myCanvas");
              var url = canvas2.toDataURL("image/png");

              var link = document.createElement("a");
              link.download = `${element.name}.png`;
              link.href = url;
              link.click();
            };
          };
        };
      };
    });

    // const elementCanvas = document.createElement("canvas");
    // elementCanvas.classList.add("hide-canvas");

    // elementCanvas.setAttribute("ref", "canvasRef");
    // const canvasObj = canvasRef.current;
    // const ctx = canvasObj.getContext("2d");
    // canvasObj.width = 700;
    // canvasObj.height = 500;

    // var background = new Image();
    // // background.setAttribute("crossOrigin", "anonymous");
    // background.src = certUrl;

    // background.onload = function () {
    //   ctx.drawImage(background, 0, 0, 700, 500);

    //   ctx.font = "20px Arial";
    //   ctx.textAlign = "left";
    //   ctx.textBaseline = "top";
    //   ctx.fillStyle = coordinates.color;

    //   if (type === "wc" || type === "mc") {
    //     ctx.font = coordinates.name[3].toString() + "px" + " Arial";
    //     ctx.fillText("Person Name", coordinates.name[1], coordinates.name[0]);
    //   }
    // };
  }

  function handle_upload(id) {
    var input = document.getElementById(id);
    input.click();
  }

  return (
    <div className="container container_2">
      <Navbar2 />
      <div className="row">
        {/* <a className="modal-open" href="#modal">
          <button className="home-button">Upload CSV File</button>
        </a> */}
        {/* <button className="home-button" onClick={download}>
          Download All
        </button> */}
        {/* <a className="modal-open" href="#modal2">
          <button className="home-button">Mail Certifcates</button>
        </a> */}
        <div className="modal" id="modal">
          <div className="modal-content c-2">
            <a
              href="#"
              className="modal-close"
              id="modalClose"
              title="Close Modal"
            >
              X
            </a>
            <h3 className="modal-title">Upload</h3>
            <div className="modal-area area2">
              <div className="row">
                <form onSubmit={() => {}} id="csvForm">
                  <div className="csv-file">
                    <p className="h">1.CSV File</p>
                    <p>
                      The CSV file should contain 2 columns only, one column
                      with heading name and one with heading email.
                    </p>
                    <div className="form-group">
                      {
                        <input
                          id="csv"
                          className="upload-input"
                          type="file"
                          onChange={onCsvChange}
                        />
                      }
                      <button
                        className="upload_button"
                        onClick={() => handle_upload("csv")}
                      >
                        {csv != "" ? "Uploaded" : "Choose CSV file"}
                      </button>
                    </div>
                  </div>
                  <div className="signatures">
                    <p className="h1">2.Signatures</p>
                    <p>
                      The images of signatures should have a transparent
                      background.
                    </p>
                    <div className="form-group">
                      {
                        <input
                          id="chairperson"
                          className="upload-input"
                          type="file"
                          onChange={onChairChange}
                        />
                      }
                      <button
                        className="upload_button"
                        onClick={() => handle_upload("chairperson")}
                      >
                        {chairSign != ""
                          ? "Uploaded"
                          : "Choose signature for chairperson"}
                      </button>
                    </div>
                    <div className="form-group">
                      {
                        <input
                          id="faculty-advisor"
                          className="upload-input"
                          type="file"
                          onChange={onFacChange}
                        />
                      }
                      <button
                        className="upload_button"
                        onClick={() => handle_upload("faculty-advisor")}
                      >
                        {facSign != ""
                          ? "Uploaded"
                          : "Choose signature for faculty advisor"}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      className="upload-btn"
                      onClick={onSubmit}
                      type="submit"
                    >
                      <img className="upload-btn-img" src={uploadBtn} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="modal2">
          <div className="modal-content c-2">
            <a
              href="#"
              className="modal-close"
              id="modalClose"
              title="Close Modal"
            >
              X
            </a>
            <h3 className="title">Mail Certificates</h3>
            <div className="modal-area">
              <div className="row">
                {show ? (
                  <div className="count">
                    Sending mails...
                    Sent {emailCount}/{arr2.length} mails
                  </div>
                ) : null}
              </div>
              <div className="row">
                <form onSubmit={emailHandler}>
                  <div className="mail-1">
                    <input
                      type="text"
                      className="mail-inp"
                      placeholder="Subject"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    <input
                      type="text"
                      className="mail-inp"
                      placeholder="Content"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <button className="mail-btn" type="submit">
                    <img className="mail-btn-img" src={mailBtn} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="csv-inst">
        {(type === "wc" || type === "mc") && (
          <div>
            The csv uploaded should contain 2 columns only, one column with
            heading <b>name</b> and one with heading <b>email</b>.{" "}
          </div>
        )}
        {type === "org" && (
          <div>
            The csv uploaded should contain 4 columns only, with headings-{" "}
            <b>name</b>, <b>email</b>,<b>event_name</b>,<b>date</b>.{" "}
          </div>
        )}
        {type === "comp" && (
          <div>
            The csv uploaded should contain 5 columns only, with headings-{" "}
            <b>name</b>, <b>email</b>,<b>event_name</b>,<b>date</b>,
            <b>position</b>.{" "}
          </div>
        )}
      </div> */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          id="myCanvas"
          className="cnvs"
          width="700"
          height="500"
        ></canvas>
      </div>
      <div className="row btn-c">
        <a className="modal-open" href="#modal">
          <button className="row-btn">
            <img className="row-img" src={uploadImg} />
          </button>
        </a>
        {/* <button className="row-btn" onClick={download}>
          <img className="row-img" src={downloadImg} />
        </button> */}
        <a className="modal-open" href="#modal2">
          <button className="row-btn">
            <img className="row-img" src={mailImg} />
          </button>
        </a>
      </div>
    </div>
  );
}
