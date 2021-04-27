import React from "react";
import { unFollow, follow, setCurrentPage, getUsers } from "../../store/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {setUsersSelector} from "../../store/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(this.props.pageSize, pageNumber)
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

const mapStateToProps = (state) => {
  // console.log("USERS MAPSTATE")
  return {
    users: setUsersSelector(state),
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    usersWithToggleFollowing: state.usersPage.usersWithToggleFollowing
  }
}

export default compose(
  connect(mapStateToProps, {
    unFollow,
    follow,
    setCurrentPage,
    getUsers
  })
)
(UsersContainer);