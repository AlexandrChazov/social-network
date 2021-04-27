import React from "react";
import styles from "./Users.module.css";
import userLogo from "../../assets/images/logo.jpg"
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pages = [];
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    // console.log("RENDER USERS")

    return <div>
      <div className = {styles.pagination} >
        {
          pages.map((pageNumber) => {
            return pageNumber === props.currentPage ?
                <div key = { pageNumber } className={styles.active} onClick = { () => { props.onPageChanged(pageNumber) } }>{pageNumber}</div>:
                <div key = { pageNumber } onClick = { () => { props.onPageChanged(pageNumber) } }>{pageNumber}</div>
          })
        }
      </div>
      {
        props.users.map((e) => <div key = { e.id }>
            <div>
              <NavLink to ={`Profile/${e.id}`} >
                <img src={e.photos.small? e.photos.small : userLogo} className={styles.userImg} alt="photo"/>
              </NavLink>
            </div>
            <div>
              { e.followed
                  ? <button onClick = { () => {
                    props.unFollow(e.id);
                  } } disabled = {
                    props.usersWithToggleFollowing.some(el => {
                      return el === e.id
                    })
                  } >unFollow</button>

                  : <button onClick = { () => {
                    props.follow(e.id);
                  } } disabled = {
                    props.usersWithToggleFollowing.some(el => {
                      return el === e.id
                    })
                  } >follow</button>
              }
            </div>
            <div>
              {e.name}
            </div>
            <div>
              {e.city}
            </div>
            <div>
              {e.country}
            </div>
            <div>
              {e.status}
            </div>
          </div>)
      }
    </div>
}

export default Users;