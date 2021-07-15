import React from "react";
import preloadeGif from "../../../assets/images/Spinner-1s-200px.svg";
import styles from "./Preloader.module.css"

type PropsType = {

}

const Preloader: React.FC<PropsType> = (props) => {
  return <div className = {styles.preloader}>
    <img src = { preloadeGif } alt = "preloader" />
  </div>
}

export default Preloader;