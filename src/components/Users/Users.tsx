import React from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {UserType} from "../../Types/types";
import {User} from "./User";
import UsersSearchForm from "./UsersSearchForm";

type PropsType = {
    totalUsersCount: number
    usersPerPage: number
    currentPageNumber: number
    countOfDisplayingPages: number
    usersWithToggleFollowing: Array<number>
    users: Array<UserType>
    term: string
    onPageChanged: (pageNumber: number) => void
    follow: (id:number) => void
    unFollow: (id:number) => void
    getUsers: (usersPerPage: number, currentPageNumber: number, term: string) => void
}

const Users: React.FC<PropsType> = (props) => {
  return (
      <div>
        <UsersSearchForm term={props.term}
                         usersPerPage={props.usersPerPage}
                         currentPageNumber={props.currentPageNumber}
                         getUsers={props.getUsers}/>
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
