import React from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../Types/types";

type PropsType = {
    totalUsersCount: number
    usersPerPage: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    countOfDisplayingPages: number
    users: Array<UserType>
    follow: () => void
    unFollow: () => void
    usersWithToggleFollowing: Array<number>
}

const Users: React.FC<PropsType> = (props) => {
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