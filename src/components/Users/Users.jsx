import React from "react";
import styles from "./Users.module.css";
import * as axios from "axios";
import userLogo from "../../assets/images/logo.jpg"

class Users extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then( response => {
      this.props.setUsers(response.data.items);
      this.props.setTotalUsersCount(response.data.totalCount);
    })
  }

  onPageChanged = (pageNumber) => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`).then( response => {
      this.props.setUsers(response.data.items);
      this.props.setCurrentPage(pageNumber)
    })
  }

  render() {
    let pages = [];
    const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }

    return <div>
      <div className = {styles.pagination} >
        {
          pages.map((pageNumber) => {
            return pageNumber === this.props.currentPage ?
                <div key = { pageNumber } className={styles.active} onClick = { () => { this.onPageChanged(pageNumber) } }>{pageNumber}</div>:
                <div key = { pageNumber } onClick = { () => { this.onPageChanged(pageNumber) } }>{pageNumber}</div>
          })
        }
      </div>
      {
        this.props.users.map((e) =>
          <div key = { e.id }>
            <div>
              <img src={e.photos.small? e.photos.small : userLogo} className={styles.userImg} alt="photo"/>
            </div>
            <div>
              { e.followed
                  ? <button onClick = { () => { this.props.unFollow(e.id) } }>unFollow</button>
                  : <button onClick = { () => { this.props.follow(e.id)} }>follow</button>
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
}

export default Users;