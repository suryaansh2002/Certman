import "./Home.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

interface Props {
  cookie: any;
  removeCookie: any;
}

function Home(props) {
  let history = useHistory();

  function handleLogout() {
    props.removeCookie("user");
    history.push("/");
    window.location.reload();
  }
  console.log(props.cookie.user);

  const [cert, setCert] = useState<string>("");
  const [uploadedCerts, setUploadedCerts] = useState<any>([]);
  const [type, setType] = useState<String>("");

  const [nameTop, setNameTop] = useState<number>(0);
  const [nameLeft, setNameLeft] = useState<number>(0);

  const [eventTop, setEventTop] = useState<number>(0);
  const [eventLeft, setEventLeft] = useState<number>(0);

  const [dateTop, setDateTop] = useState<number>(0);
  const [dateLeft, setDateLeft] = useState<number>(0);

  const [positionTop, setPositionTop] = useState<number>(0);
  const [positionLeft, setPositionLeft] = useState<number>(0);

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
    const coordinates={
      name:[nameTop,nameLeft],
      event:[eventTop,eventLeft],
      date:[dateTop,dateLeft],
      postion:[positionTop, positionLeft]
    }
    
    console.log(formData);
    console.log(coordinates)

    await axios
      .post("http://localhost:5000/api/cert/cert-upload", formData, {})
      .then((res) => {
        console.log(res);
      });
    const modalClose: any = document.getElementById("modalClose");
    modalClose.click();
    window.location.reload();
  };

  function onFileChange(e) {
    setCert(e.target.files[0]);
  }

  return (
    <div className="container">
      <div className="home-top">
        <button onClick={() => handleLogout()} className="logout-button">
          Logout
        </button>
      </div>
      <div className="home-main">
        <a className="modal-open" href="#modal">
          {" "}
          <button className="home-button">Upload a new Template</button>
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
            <h3 className="modal-title">Upload A New Template</h3>
            <div className="modal-area">
              <div className="row">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <select
                      className="type-select"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select The Type of certificate</option>
                      <option value="wc">WC Tenure Completion</option>
                      <option value="mc">MC Tenure Completion</option>
                      <option value="org">Organizing a Competition</option>
                      <option value="win">Winning A Compeition</option>
                    </select>
                  </div>
                  {type && (
                    <div className="row row-h">
                      Enter Coordinates of relavent fields:
                      {type == "wc" || type == "mc" ? (
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
                                setNameTop(parseInt(e.target.value))
                              }
                            ></input>
                            <label>Left:</label>
                            <input
                              className="type-input"
                              type="number"
                              onChange={(e) =>
                                setNameLeft(parseInt(e.target.value))
                              }
                            ></input>
                          </div>
                        </div>
                      ) : null}
                      {type == "org" ? (
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
                                  setNameTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setNameLeft(parseInt(e.target.value))
                                }
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
                                onChange={(e) =>
                                  setEventTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setEventLeft(parseInt(e.target.value))
                                }
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
                                onChange={(e) =>
                                  setDateTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setDateLeft(parseInt(e.target.value))
                                }
                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {type == "win" ? (
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
                                  setNameTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setNameLeft(parseInt(e.target.value))
                                }
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
                                onChange={(e) =>
                                  setEventTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setEventLeft(parseInt(e.target.value))
                                }
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
                                onChange={(e) =>
                                  setDateTop(parseInt(e.target.value))
                                }
                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setDateLeft(parseInt(e.target.value))
                                }
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
                                onChange={(e) =>
                                  setPositionTop(parseInt(e.target.value))
                                }

                              ></input>
                              <label>Left:</label>
                              <input
                                className="type-input"
                                type="number"
                                onChange={(e) =>
                                  setPositionLeft(parseInt(e.target.value))
                                }

                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
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

        {props.cookie.user.role === "Board" ? (
          <Link to={"/generate"}>
            <button className="home-button">Generate Certificates</button>
          </Link>
        ) : null}
      </div>
      <div className="home-header">Existing Templates</div>
      {uploadedCerts.map((cert) => (
        <img src={cert.certUrl} className="home-photo" />
      ))}
    </div>
  );
}

export default Home;
