import React from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";

const Users = (props) => {
  return (
      <div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   usersPerPage={props.usersPerPage}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   countOfDisplayingPages = {props.countOfDisplayingPages}
        />
        <div>
          {props.users.map((user) => <User key={user.id}
                                           user={user}
                                           follow={props.follow}
                                           unFollow={props.unFollow}
                                           usersWithToggleFollowing={props.usersWithToggleFollowing} />)}
        </div>
      </div>
  )
}

export default Users;