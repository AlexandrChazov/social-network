import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";
import Friend from "./Friend/Friend";

const Navbar = (props) => {
  const friends = props.friends.map( (f) => <Friend friend = {f.name} img = {f.img} />)
  return (
    <div>
      <nav className={styles.navbar}>
        <NavLink to="/Profile/1" className={styles.item} activeClassName={styles.active}>Profile</NavLink>
        <NavLink to="/Dialogs" className={styles.item} activeClassName={styles.active}>Messages</NavLink>
        <NavLink to="/News" className={styles.item} activeClassName={styles.active}>News</NavLink>
      </nav>
      <div>
        <div>FRIENDS</div>
        { friends }
      </div>
    </div>
  )
};

export default Navbar;
