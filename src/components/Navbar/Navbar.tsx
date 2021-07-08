import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import Friend from "./Friend/Friend";
import {FriendsArrayType} from "../../redux/sidebar-reducer";

type PropsType = {
    friends: Array<FriendsArrayType>
}

const Navbar: React.FC<PropsType> = (props) => {
  const friends = props.friends.map( (f) => <Friend friend = {f.name} img = {f.photoUrl} key = {f.id} />)
  return (
    <div>
      <nav className={styles.navbar}>
        <NavLink to="/Profile" className={styles.item} activeClassName={styles.active}>Profile</NavLink>
        <NavLink to="/Dialogs" className={styles.item} activeClassName={styles.active}>Messages</NavLink>
        <NavLink to="/News" className={styles.item} activeClassName={styles.active}>News</NavLink>
        <NavLink to="/Users" className={styles.item} activeClassName={styles.active}>Users</NavLink>
      </nav>
      <div>
        <div>FRIENDS</div>
        { friends }
      </div>
    </div>
  )
};

export default Navbar;
