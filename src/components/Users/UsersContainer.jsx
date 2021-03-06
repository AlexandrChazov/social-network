import React from "react";
import { followAC, unFollowAC, setUsersAC, setTotalUsersCountAC, setCurrentPageAC } from "../../store/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";

const mapStateToProps = ( state ) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    follow: (userId) => {
      const action = followAC(userId);
      dispatch(action);
    },
    unFollow: (userId) => {
      const action = unFollowAC(userId);
      dispatch(action);
    },
    setUsers: (users) => {
      const action = setUsersAC(users);
      dispatch(action);
    },
    setTotalUsersCount: (number) => {
      const action = setTotalUsersCountAC(number);
      dispatch(action);
    },
    setCurrentPage: (number) => {
      const action = setCurrentPageAC(number);
      dispatch(action);
    }
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;