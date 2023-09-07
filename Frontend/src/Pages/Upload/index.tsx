import { useState } from "react";
import "./Upload.css";
import axios from "axios";
import { useAuthState } from "../../Context";
import Navbar2 from "../Navbar2/Navbar2";
import qr from "../../images/qrcode.png";
import sig from "../../images/sig.png";

import up from "../../images/upload-btn.png";

export default function Upload() {
  const userDetails = useAuthState();

  let userId = userDetails.user.id;
  const [cert, setCert] = useState("");
  const [type, setType] = useState("");

  const [qrTop, setqrTop] = useState<number>(0);
  const [qrLeft, setqrLeft] = useState<number>(0);
  const [qrW, setqrW] = useState<number>(0);
  const [qrH, setqrH] = useState<number>(0);

  const [sig1Top, setsig1Top] = useState<number>(0);
  const [sig1Left, setsig1Left] = useState<number>(0);
  const [sig1W, setsig1W] = useState<number>(0);
  const [sig1H, setsig1H] = useState<number>(0);

  const [sig2Top, setsig2Top] = useState<number>(0);
  const [sig2Left, setsig2Left] = useState<number>(0);
  const [sig2W, setsig2W] = useState<number>(0);
  const [sig2H, setsig2H] = useState<number>(0);

  const [nameTop, setNameTop] = useState<number>(0);
  const [nameLeft, setNameLeft] = useState<number>(0);
  const [nameW, setNameW] = useState<number>(0);
  const [nameFont, setNameFont] = useState<number>(0);

  const [eventTop, setEventTop] = useState<number>(0);
  const [eventLeft, setEventLeft] = useState<number>(0);
  const [eventW, setEventW] = useState<number>(0);
  const [eventFont, setEventFont] = useState<number>(0);

  const [dateTop, setDateTop] = useState<number>(0);
  const [dateLeft, setDateLeft] = useState<number>(0);
  const [dateW, setDateW] = useState<number>(0);
  const [dateFont, setDateFont] = useState<number>(0);

  const [positionTop, setPositionTop] = useState<number>(0);
  const [positionLeft, setPositionLeft] = useState<number>(0);
  const [positionW, setPositionW] = useState<number>(0);
  const [positionFont, setPositionFont] = useState<number>(0);

  const [alert, setAlert] = useState<boolean>(false);
  const [c, setC] = useState();

  // const[color,setColor]=useState();
  function onFileChange(e) {
    setCert(e.target.files[0]);

    console.log("In this");
    // @ts-ignore
    var file = document.getElementById("file-inp").files[0];
    console.log(file);
    var reader = new FileReader();
    console.log(reader);
    reader.onloadend = function () {
      document.getElementById("set-bg").style.backgroundImage =
        "url(" + reader.result + ")";
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
    document.getElementById("up-btn").style.visibility = "hidden";
  }

  function upload() {
    const inp = document.getElementById("file-inp");
    inp.click();
  }

  function positionqrTop(e) {
    setqrTop(parseInt(e.target.value));
    const q = document.getElementById("qrc");
    q.style.top = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function positionqrLeft(e) {
    setqrLeft(parseInt(e.target.value));
    const q = document.getElementById("qrc");
    q.style.left = e.target.value.toString() + "px";
    console.log(nameLeft);
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function qrWidth(e) {
    setqrW(parseInt(e.target.value));
    const q = document.getElementById("qrc");
    q.style.width = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function qrHeight(e) {
    setqrH(parseInt(e.target.value));

    const q = document.getElementById("qrc");
    q.style.height = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }

  function positionsig1Top(e) {
    setsig1Top(parseInt(e.target.value));
    const q = document.getElementById("sig1");
    q.style.top = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function positionsig1Left(e) {
    setsig1Left(parseInt(e.target.value));
    const q = document.getElementById("sig1");
    q.style.left = e.target.value.toString() + "px";
    console.log(nameLeft);
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function sig1Width(e) {
    setsig1W(parseInt(e.target.value));
    const q = document.getElementById("sig1");
    q.style.width = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function sig1Height(e) {
    setsig1H(parseInt(e.target.value));

    const q = document.getElementById("sig1");
    q.style.height = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }

  function positionsig2Top(e) {
    setsig2Top(parseInt(e.target.value));
    const q = document.getElementById("sig2");
    q.style.top = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function positionsig2Left(e) {
    setsig2Left(parseInt(e.target.value));
    const q = document.getElementById("sig2");
    q.style.left = e.target.value.toString() + "px";
    console.log(nameLeft);
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function sig2Width(e) {
    setsig2W(parseInt(e.target.value));
    const q = document.getElementById("sig2");
    q.style.width = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }
  function sig2Height(e) {
    setsig2H(parseInt(e.target.value));

    const q = document.getElementById("sig2");
    q.style.height = e.target.value.toString() + "px";
    q.style.visibility = "visible";
    q.style.zIndex = "10";
  }

  function positionNameTop(e) {
    setNameTop(parseInt(e.target.value));
    const name = document.getElementById("name");
    name.style.top = e.target.value.toString() + "px";
    name.style.visibility = "visible";
    name.style.zIndex = "10";
    name.innerHTML = "Person Name";
  }
  function positionNameLeft(e) {
    setNameLeft(parseInt(e.target.value));
    const name = document.getElementById("name");
    name.style.left = e.target.value.toString() + "px";
    console.log(nameLeft);
    name.style.visibility = "visible";
    name.style.zIndex = "10";
    name.innerHTML = "Person Name";
  }
  function NameW(e) {
    setNameW(parseInt(e.target.value));
    const name = document.getElementById("name");
    name.style.width = e.target.value.toString() + "px";
    name.style.visibility = "visible";
    name.style.zIndex = "10";
    name.innerHTML = "Person Name";
  }
  function NameFont(e) {
    setNameFont(parseInt(e.target.value));
    const name = document.getElementById("name");
    name.style.fontSize = e.target.value.toString() + "px";
    name.style.visibility = "visible";
    name.style.zIndex = "10";
    name.innerHTML = "Person Name";
  }

  function positionEventTop(e) {
    setEventTop(parseInt(e.target.value));
    const event = document.getElementById("event");
    event.style.top = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "Event Name";
  }
  function positionEventLeft(e) {
    setEventLeft(parseInt(e.target.value));

    const event = document.getElementById("event");
    event.style.left = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "Event Name";
  }
  function EventW(e) {
    setEventW(parseInt(e.target.value));

    const event = document.getElementById("event");
    event.style.width = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "Event Name";
  }
  function EventFont(e) {
    setEventFont(parseInt(e.target.value));

    const event = document.getElementById("event");
    event.style.fontSize = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "Event Name";
  }

  function positionEventDateTop(e) {
    setDateTop(parseInt(e.target.value));
    const event = document.getElementById("e-date");
    event.style.top = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "01-01-2022";
  }
  function positionEventDateLeft(e) {
    setDateLeft(parseInt(e.target.value));
    const eventDate = document.getElementById("e-date");
    eventDate.style.left = e.target.value.toString() + "px";
    eventDate.style.visibility = "visible";
    eventDate.style.zIndex = "10";
    eventDate.innerHTML = "01-01-2022";
  }
  function EventDateW(e) {
    setDateW(parseInt(e.target.value));
    const eventDate = document.getElementById("e-date");
    eventDate.style.width = e.target.value.toString() + "px";
    eventDate.style.visibility = "visible";
    eventDate.style.zIndex = "10";
    eventDate.innerHTML = "01-01-2022";
  }
  function EventDateFont(e) {
    setDateFont(parseInt(e.target.value));
    const eventDate = document.getElementById("e-date");
    eventDate.style.fontSize = e.target.value.toString() + "px";
    eventDate.style.visibility = "visible";
    eventDate.style.zIndex = "10";
    eventDate.innerHTML = "01-01-2022";
  }

  function positionPosTop(e) {
    setPositionTop(parseInt(e.target.value));
    const position = document.getElementById("position");
    position.style.top = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }
  function positionPosLeft(e) {
    setPositionLeft(parseInt(e.target.value));
    const position = document.getElementById("position");
    position.style.left = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }
  function PositionW(e) {
    setPositionW(parseInt(e.target.value));
    const position = document.getElementById("position");
    position.style.width = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }
  function PositionFont(e) {
    setPositionFont(parseInt(e.target.value));
    const position = document.getElementById("position");
    position.style.fontSize = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }

  const coordinates = {
    name: [nameTop, nameLeft, nameW, nameFont],
    event: [eventTop, eventLeft, eventW, eventFont],
    date: [dateTop, dateLeft, dateW, dateFont],
    position: [positionTop, positionLeft, positionW, positionFont],
    qr: [qrTop, qrLeft, qrH, qrW],
    cpSig: [sig1Top, sig1Left, sig1H, sig1W],
    faSig: [sig2Top, sig2Left, sig2H, sig2W],
    color: c,
  };
  function setColor(value) {
    setC(value);
    var name = document.getElementById("name");
    var event = document.getElementById("event");
    var eDate = document.getElementById("e-date");
    var position = document.getElementById("position");

    name.style.color = value;
    event.style.color = value;
    eDate.style.color = value;
    position.style.color = value;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("certUrl", cert);
    console.log(formData);
    await axios
      .post("http://localhost:5000/api/cert/cert-upload", formData)
      .then(async (res: any) => {
        console.log(res);
        console.log(res.data._id);

        var certDetailObj = {
          certId: res.data._id,
          category: type,
          userId: userId,
          coordinates: coordinates,
        };
        console.log("Hello");
        console.log(certDetailObj);
        await axios
          .put(
            "http://localhost:5000/api/cert/cert-upload-details",
            certDetailObj
          )
          .then((res) => {
            console.log(res);
            // window.alert("Certificate Uploaded Successfully");
            setAlert(true);
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  console.log(userId);
  return (
    <div
      className={
        type === "comp"
          ? "container cont3"
          : type === "org"
          ? "container cont2"
          : "container cont1"
      }
    >
      {alert && (
        <div className="alert">
          Congratulations! Certifcate has been uploaded successfully!!
        </div>
      )}

      <Navbar2 />
      <div className="left-c">
        <div className="left-box" id="set-bg">
          <div id="name">Person Name</div>
          <div id="event">Event Name</div>
          <div id="e-date">01/01/21</div>
          <div id="position">2</div>
          <img alt="qr" src={qr} id="qrc"></img>
          <img alt="sig1" src={sig} id="sig1"></img>
          <img alt="sig1" src={sig} id="sig2"></img>

          <button className="up-btn" id="up-btn" onClick={upload}>
            <img src={up} />
          </button>
        </div>

        <button className="delete-up" onClick={() => window.location.reload()}>
          Delete Image
        </button>
      </div>

      <div className="right-c">
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="upload-input"
              type="file"
              id="file-inp"
              onChange={onFileChange}
            />
          </div>
          <div className="up-box">
            <select
              onChange={(e) => setType(e.target.value)}
              className="up-select"
            >
              <option id="op" value="">
                Purpose of Generating Certificate
              </option>
              <option id="op" value="wc">
                WC Completion
              </option>
              <option id="op" value="mc">
                MC Completion
              </option>
              <option id="op" value="org">
                Organizing a Competition
              </option>
              <option id="op" value="comp">
                Participating in or winning a Competition
              </option>
            </select>

            {type && (
              <div className="type-container">
                <div>
                  <div className="enter">ENTER THE SPECIFICATIONS:</div>
                  <div>
                    <div className="row type-row">
                      <label className="type-label" id="c-label">
                        Font Colour:
                      </label>
                      <input
                        type={"color"}
                        id="color"
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div className="row type-row">
                      <label className="type-label">1. Name:</label>
                      <br />
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Top:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionNameTop(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label>Left:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionNameLeft(e)}
                          ></input>
                        </div>
                      </div>
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Width:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => NameW(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label>Font:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => NameFont(e)}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">2. QRCODE:</label>
                      <br />
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Top:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionqrTop(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label>Left:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionqrLeft(e)}
                          ></input>
                        </div>

                        {/* <div className="row input-row" id="qr-row"> */}
                      </div>
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Width:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => qrWidth(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="">Height:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => qrHeight(e)}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        3. Faculty Advisor Signature:
                      </label>
                      <br />
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Top:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionsig2Top(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label>Left:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionsig2Left(e)}
                          ></input>
                        </div>

                        {/* <div className="row input-row" id="qr-row"> */}
                      </div>
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Width:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => sig2Width(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="">Height:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => sig2Height(e)}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        4. Chairperson Signature:
                      </label>
                      <br />
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Top:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionsig1Top(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label>Left:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => positionsig1Left(e)}
                          ></input>
                        </div>

                        {/* <div className="row input-row" id="qr-row"> */}
                      </div>
                      <div className="row input-row">
                        <div className="col-lg-6">
                          <label>Width:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => sig1Width(e)}
                          ></input>
                        </div>
                        <div className="col-lg-6">
                          <label className="">Height:</label>
                          <input
                            className="type-input"
                            type="number"
                            onChange={(e) => sig1Height(e)}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  {type === "org" && (
                    <div>
                      <div className="row type-row">
                        <label className="type-label">5. Event Name:</label>
                        <br />
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Top:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventTop(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventLeft(e)}
                            ></input>
                          </div>
                        </div>

                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Width:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventW(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Font:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventFont(e)}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row type-row">
                        <label className="type-label">6. Event Date:</label>
                        <br />
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Top:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventDateTop(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventDateLeft(e)}
                            ></input>
                          </div>
                        </div>
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Width:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventDateW(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Font:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventDateFont(e)}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}{" "}
                  {type === "comp" && (
                    <div>
                      <div className="row type-row">
                        <label className="type-label">5. Event Name:</label>
                        <br />
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Top:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventTop(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventLeft(e)}
                            ></input>
                          </div>
                        </div>
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Width:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventFont(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Font:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventW(e)}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row type-row">
                        <label className="type-label">6. Event Date:</label>
                        <br />
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Top:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventDateTop(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionEventDateLeft(e)}
                            ></input>
                          </div>
                        </div>
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Width:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventDateW(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Font:</label>

                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => EventDateFont(e)}
                            ></input>
                          </div>
                        </div>
                      </div>{" "}
                      <div className="row type-row">
                        <label className="type-label">7. Positon Won:</label>
                        <br />
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Top:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionPosTop(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => positionPosLeft(e)}
                            ></input>
                          </div>
                        </div>
                        <div className="row input-row">
                          <div className="col-lg-6">
                            <label>Width:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => PositionW(e)}
                            ></input>
                          </div>
                          <div className="col-lg-6">
                            <label>Font:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) => PositionFont(e)}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row input-row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                      <button type="submit" className="submit-up">
                        Upload
                      </button>
                    </div>
                  </div>
                  {/* <div className={type === "comp" ? "upload-info info3" : type==="org" ? "upload-info info2" : "upload-info"}> */}
                  <div className="upload-info">
                    <span style={{ fontWeight: 800, marginRight: "10px" }}>
                      Note:
                    </span>
                    The dimmensions of the certificate are 700px x 500px, please
                    enter all coordinates in px keeping this height and width in
                    mind.
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
