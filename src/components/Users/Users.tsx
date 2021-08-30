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

const Users: React.FC = () => {

  useEffect(() => {
    getUsers_(usersPerPage, currentPageNumber, filter)
  }, [])

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
