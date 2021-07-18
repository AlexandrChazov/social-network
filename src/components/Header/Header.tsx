import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

export type HeaderMapPropsType = {
    isAuth: boolean
    login: string | null
}

export type HeaderDispatchPropsType = {
    logout: () => void
}

const Header: React.FC<HeaderMapPropsType & HeaderDispatchPropsType> = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.login}>
        {props.isAuth
            ? <Login login={props.login} logout={props.logout} />
            : <NavLink to = "/Login"> Login </NavLink>}
      </div>
    </div>
  )
}

type LoginMapPropsType = {
    login: string | null
}

const Login: React.FC<LoginMapPropsType & HeaderDispatchPropsType> = (props) => {
  return (
      <div>
        <div>
          {props.login}
        </div>
        <div>
          <button onClick = {props.logout}>Log out</button>
        </div>
      </div>
  )
}

export default Header;
