import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.login}>
        {props.isAuth
            ? props.login
            : <NavLink to = "/Login"> Login </NavLink>}
      </div>
    </div>
  )
}

export default Header;
