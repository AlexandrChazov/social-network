import React from "react";
import styles from "./Users.module.css";
import userLogo from "../../assets/images/logo.jpg"
import {NavLink} from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {

    let pages = [];
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

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
        props.users.map((e) =>
          <div key = { e.id }>
            <div>
              <NavLink to ={`Profile/${e.id}`} >
                <img src={e.photos.small? e.photos.small : userLogo} className={styles.userImg} alt="photo"/>
              </NavLink>
            </div>
            <div>
              { e.followed
                  ? <button onClick = { () => {
                      axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${e.id}`, {
                        withCredentials: true,
                        headers: {
                        "API-KEY": "0986e0b3-b5b7-484b-97d9-f8c2f2bb89fa"
                        }
                      }).then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unFollow(e.id)
                        }
                      })
                  } }>unFollow</button>

                  : <button onClick = { () => {
                      axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${e.id}`, {}, {
                        withCredentials: true,
                        headers: {
                          "API-KEY": "0986e0b3-b5b7-484b-97d9-f8c2f2bb89fa"
                        }
                      }).then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(e.id)
                        }
                      })
                  } }>follow</button>
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