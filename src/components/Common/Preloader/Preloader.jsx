import React from "react";
import preloadeGif from "../../../assets/images/Spinner-1s-200px.svg";

const Preloader = (props) => {
  return <div>
    <img src = { preloadeGif }  />
  </div>
}

export default Preloader;