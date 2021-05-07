import React from "react";
import { unFollow, follow, setCurrentPage, getUsers } from "../../redux/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {setUsersSelector} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    const {pageSize, currentPage} = this.props;
    this.props.getUsers(pageSize, currentPage)
  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.getUsers(pageSize, pageNumber)
  }

  render() {
    return (
        <>
          <Users
              totalUsersCount = {this.props.totalUsersCount}
              pageSize = {this.props.pageSize}
              currentPage = {this.props.currentPage}
              users = {this.props.users}
              unFollow = {this.props.unFollow}
              follow = {this.props.follow}
              usersWithToggleFollowing = {this.props.usersWithToggleFollowing}
              toggleFollowing = {this.props.toggleFollowing}
              countOfDisplayingPages = {this.props.countOfDisplayingPages}
              onPageChanged = {this.onPageChanged} />
          { this.props.isFetching ? <Preloader /> : null }
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
    usersWithToggleFollowing: state.usersPage.usersWithToggleFollowing,
    countOfDisplayingPages: state.usersPage.countOfDisplayingPages,
    paginatorPagesBlockNumber: state.usersPage.paginatorPagesBlockNumber
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