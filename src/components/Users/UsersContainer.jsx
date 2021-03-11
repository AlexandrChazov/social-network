import React from "react";
import { followAC, unFollowAC, setUsersAC, setTotalUsersCountAC, setCurrentPageAC, isFetchingAC } from "../../store/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import * as axios from "axios";
import Preloader from "../Common/Preloader/Preloader";

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then( response => {
      this.props.setUsers(response.data.items);
      this.props.setTotalUsersCount(response.data.totalCount);
      this.props.toggleIsFetching(false);
    })
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`).then( response => {
      this.props.setUsers(response.data.items);
      this.props.setCurrentPage(pageNumber);
      this.props.toggleIsFetching(false);
    })
  }

  render() {
    return (
        <>
          { this.props.isFetching ? <Preloader /> : null }
          <Users
                totalUsersCount = {this.props.totalUsersCount}
                pageSize = {this.props.pageSize}
                currentPage = {this.props.currentPage}
                users = {this.props.users}
                unFollow = {this.props.unFollow}
                follow = {this.props.follow}
                onPageChanged = {this.onPageChanged} />
        </>
        )
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
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
    },
    toggleIsFetching: (boolean) => {
      const action = isFetchingAC(boolean);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);