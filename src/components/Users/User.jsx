import {NavLink} from "react-router-dom";
import userLogo from "../../assets/images/logo.jpg";
import styles from "./Users.module.css";
import React from "react";

export const User = ({user, follow, unFollow, usersWithToggleFollowing}) => {
  return (
      <div>
        <div>
          <NavLink to={`Profile/${user.id}`}>
            <img src={user.photos.small ? user.photos.small : userLogo} className={styles.userImg} alt="user"/>
          </NavLink>
        </div>
        <div>
          {user.followed
              ? <button onClick={() => {
                unFollow(user.id);
              }} disabled={
                usersWithToggleFollowing.some(el => {
                  return el === user.id
                })
              }>unFollow</button>

              : <button onClick={() => {
                follow(user.id);
              }} disabled={
                usersWithToggleFollowing.some(el => {
                  return el === user.id
                })
              }>follow</button>
          }
        </div>
        <div>
          {user.name}
        </div>
        <div>
          {user.city}
        </div>
        <div>
          {user.country}
        </div>
        <div>
          {user.status}
        </div>
      </div>
  )
}
