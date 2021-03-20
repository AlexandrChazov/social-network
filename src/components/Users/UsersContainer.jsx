import React from "react";
import { follow, unFollow, setUsers, setTotalUsersCount, setCurrentPage, toggleIsFetching, toggleFollowing } from "../../store/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(data.totalCount);
    })

  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
      this.props.setUsers(data.items);
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
                usersWithToggleFollowing = {this.props.usersWithToggleFollowing}
                toggleFollowing = {this.props.toggleFollowing}
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
    isFetching: state.usersPage.isFetching,
    usersWithToggleFollowing: state.usersPage.usersWithToggleFollowing
  }
}

export default connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setTotalUsersCount,
  setCurrentPage,
  toggleIsFetching,
  toggleFollowing
  })
  (UsersContainer);