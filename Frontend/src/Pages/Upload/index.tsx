import { useState } from "react";
import "./Upload.css";
import axios from "axios";
import { useAuthState } from "../../Context";
import Navbar2 from "../Navbar2/Navbar2";
import qr from "../../images/qrcode.png";

export default function Upload() {
  const userDetails = useAuthState();

  let userId = userDetails.user.id;
  const [cert, setCert] = useState("");
  const [type, setType] = useState("");

  const [qrTop, setqrTop] = useState<number>(0);
  const [qrLeft, setqrLeft] = useState<number>(0);
  const [qrW, setqrW] = useState<number>(0);
  const [qrH, setqrH] = useState<number>(0);

  const [nameTop, setNameTop] = useState<number>(0);
  const [nameLeft, setNameLeft] = useState<number>(0);

  const [eventTop, setEventTop] = useState<number>(0);
  const [eventLeft, setEventLeft] = useState<number>(0);

  const [dateTop, setDateTop] = useState<number>(0);
  const [dateLeft, setDateLeft] = useState<number>(0);

  const [positionTop, setPositionTop] = useState<number>(0);
  const [positionLeft, setPositionLeft] = useState<number>(0);

  const [alert, setAlert] = useState<boolean>(false);

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

  function positionEventDateTop(e) {
    setDateTop(e.target.value);
    const event = document.getElementById("e-date");
    event.style.top = e.target.value.toString() + "px";
    event.style.visibility = "visible";
    event.style.zIndex = "10";
    event.innerHTML = "01-01-2022";
  }
  function positionEventDateLeft(e) {
    setDateLeft(e.target.value);
    const eventDate = document.getElementById("e-date");
    eventDate.style.left = e.target.value.toString() + "px";
    eventDate.style.visibility = "visible";
    eventDate.style.zIndex = "10";
    eventDate.innerHTML = "01-01-2022";
  }
  function positionPosTop(e) {
    setPositionTop(e.target.value);
    const position = document.getElementById("position");
    position.style.top = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }
  function positionPosLeft(e) {
    setPositionLeft(e.target.value);
    const position = document.getElementById("position");
    position.style.left = e.target.value.toString() + "px";
    position.style.visibility = "visible";
    position.style.zIndex = "10";
    position.innerHTML = "1st";
  }

  const coordinates = {
    name: [nameTop, nameLeft],
    event: [eventTop, eventLeft],
    date: [dateTop, dateLeft],
    postion: [positionTop, positionLeft],
    qr: [qrTop, qrLeft, qrH, qrW],
  };

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
            setTimeout(function(){
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
    <div className="container">
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

          <button className="up-btn" id="up-btn" onClick={upload}>
            Choose a file
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
              <option value="">Select Type of Certificate</option>
              <option value="wc">WC Completion</option>
              <option value="mc">MC Completion</option>
              <option value="org">Organizing a Competition</option>
              <option value="comp">
                Participating in or winning a Competition
              </option>
            </select>
            {type && (
              <div>
                <div>
                  <div className="row type-row">
                    <div>QRCODE:</div>
                    <label className="type-label">
                      Coordinates for QRCODE:
                    </label>
                    <br />
                    <div className="row input-row">
                      <label>Top:</label>
                      <input
                        className="type-input"
                        type="number"
                        onChange={(e) => positionqrTop(e)}
                      ></input>
                      <label>Left:</label>
                      <input
                        className="type-input"
                        type="number"
                        onChange={(e) => positionqrLeft(e)}
                      ></input>
                    </div>
                    <div className="row input-row" id="qr-row">
                      <label>Width:</label>
                      <input
                        className="type-input"
                        type="number"
                        onChange={(e) => qrWidth(e)}
                      ></input>
                      <label>Height:</label>
                      <input
                        className="type-input"
                        type="number"
                        onChange={(e) => qrHeight(e)}
                      ></input>
                    </div>
                  </div>
                </div>
                {(type === "wc" || type === "mc") && (
                  <div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for name:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionNameTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionNameLeft(e)}
                        ></input>
                      </div>
                    </div>
                  </div>
                )}
                {type === "org" && (
                  <div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for name:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionNameTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionNameLeft(e)}
                        ></input>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for Event Name:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventLeft(e)}
                        ></input>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for Event Date:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventDateTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventDateLeft(e)}
                        ></input>
                      </div>
                    </div>
                  </div>
                )}{" "}
                {type === "comp" && (
                  <div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for name:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) =>
                            // setNameTop(parseInt(e.target.value)),
                            positionNameTop(e)
                          }
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionNameLeft(e)}
                        ></input>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for Event Name:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventLeft(e)}
                        ></input>
                      </div>
                    </div>
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for Event Date:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventDateTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionEventDateLeft(e)}
                        ></input>
                      </div>
                    </div>{" "}
                    <div className="row type-row">
                      <label className="type-label">
                        Enter Coordinates for Positon Won:
                      </label>
                      <br />
                      <div className="row input-row">
                        <label>Top:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionPosTop(e)}
                        ></input>
                        <label>Left:</label>
                        <input
                          className="type-input"
                          type="number"
                          onChange={(e) => positionPosLeft(e)}
                        ></input>
                      </div>
                    </div>
                  </div>
                )}
                <div className="upload-info">
                  The height of the certificate is 700px x 500px, please enter
                  all coordinates in px keeping this height and width in mind.
                </div>
                <div>
                  <button type="submit" className="submit-up">
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
