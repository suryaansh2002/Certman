import React, { useEffect, useState } from "react";
import "./Certificate.css";
import { useAuthDispatch, logOut, useAuthState } from "../../Context";

export default function Certificate() {
  const [name, setName] = useState("");
  useEffect(() => {
    var a = window.location.href.split("/")[4];
    console.log(a)
    const d: any = document.querySelector(".img-div");
    var s = "http://localhost:5000/emailed-cert-uploads/" + a;
    d.style.backgroundImage = "url(" + s + ")";
    var full = a.split("_")[0];
    var split = full.split("%20");
    console.log(split);
    if (split.length > 1) {
      setName(split[0] + " " + split[1]);
    } else {
      setName(split[0]);
    }
  }, []);
  return (
    <div>
      {/* <Navbar2 login={false} signup={false} /> */}
      <div className="main-c">
        <div className="bg-design"></div>
        <div className="name-cert">Congratulations {name}!</div>
        <div className="img-div"></div>
      </div>
    </div>
  );
}
