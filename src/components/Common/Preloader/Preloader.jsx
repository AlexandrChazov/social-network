import React from "react";
import preloadeGif from "../../../assets/images/Spinner-1s-200px.svg";
import * as styles from "./Preloader.module.css"

const Preloader = (props) => {
  return <div className = {styles.preloader}>
    <img src = { preloadeGif } alt = "preloader" />
  </div>
}

export default Preloader;