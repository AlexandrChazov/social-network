import React, {useEffect} from "react";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, follow, getUsers, unFollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getCountOfDisplayingPages,
  getCurrentPageNumber,
  getTotalUsersCount,
  getUsersFilter,
  getUsersWithToggleFollowing,
  setUsersPerPage,
  setUsersSelector
} from "../../redux/users-selectors";
import { useHistory } from "react-router-dom";

const Users: React.FC = () => {

  const dispatch = useDispatch();

  const users = useSelector(setUsersSelector);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPageNumber = useSelector(getCurrentPageNumber);
  const usersPerPage = useSelector(setUsersPerPage);
  const filter = useSelector(getUsersFilter);
  const usersWithToggleFollowing = useSelector(getUsersWithToggleFollowing);
  const countOfDisplayingPages = useSelector(getCountOfDisplayingPages);

  const follow_ = (id:number) => {dispatch(follow(id))};
  const unFollow_ = (id:number) => {dispatch(unFollow(id))};
  const getUsers_ = (usersPerPage: number, currentPageNumber: number, filter: FilterType) => {
    dispatch(getUsers(usersPerPage, currentPageNumber, filter))
  };

  const history = useHistory();

  useEffect(() => {
    getUsers_(usersPerPage, currentPageNumber, filter)
  }, [usersPerPage, currentPageNumber, filter])

  useEffect(() => {
    history.push({
      pathname: `/Users`,
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPageNumber}`
    })
  }, [filter, currentPageNumber])

  const onPageChanged = (pageNumber: number) => {
    getUsers_(usersPerPage, pageNumber, filter)
  }

  return (
      <div>
        <UsersSearchForm usersPerPage={usersPerPage}
                         currentPageNumber={currentPageNumber}
                         getUsers={getUsers_}/>
        <Paginator totalUsersCount={totalUsersCount}
                   usersPerPage={usersPerPage}
                   currentPageNumber={currentPageNumber}
                   onPageChanged={onPageChanged}
                   countOfDisplayingPages = {countOfDisplayingPages}
        />
        <div>
          {users.map((user) => <User key={user.id}
                                           user={user}
                                           follow={follow_}
                                           unFollow={unFollow_}
                                           usersWithToggleFollowing={usersWithToggleFollowing} />)}
        </div>
      </div>
  )
}

export default Users;
