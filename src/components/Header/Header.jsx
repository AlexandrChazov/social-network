import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.login}>
        {props.isAuth
            ? <Login login={props.login} deleteAuth={props.deleteAuth} />
            : <NavLink to = "/Login"> Login </NavLink>}
      </div>
    </div>
  )
}

const Login = (props) => {
  return (
      <div>
        <div>
          {props.login}
        </div>
        <div>
          <button onClick = {props.deleteAuth}>Log out</button>
        </div>
      </div>
  )
}

export default Header;
