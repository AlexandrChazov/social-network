import React from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {UserType} from "../../Types/types";
import {User} from "./User";

type PropsType = {
    totalUsersCount: number
    usersPerPage: number
    currentPageNumber: number
    onPageChanged: (pageNumber: number) => void
    countOfDisplayingPages: number
    users: Array<UserType>
    follow: (id:number) => void
    unFollow: (id:number) => void
    usersWithToggleFollowing: Array<number>
}

const Users: React.FC<PropsType> = (props) => {
  return (
      <div>
        <Paginator totalUsersCount={props.totalUsersCount}
                   usersPerPage={props.usersPerPage}
                   currentPageNumber={props.currentPageNumber}
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
