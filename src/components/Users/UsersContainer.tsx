import React from "react";
import { unFollow, follow, setCurrentPage, getUsers } from "../../redux/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {setUsersSelector} from "../../redux/users-selectors";
import {UserType} from "../../Types/types";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    totalUsersCount: number
    usersPerPage: number
    currentPage: number
    users: Array<UserType>
    usersWithToggleFollowing: Array<number>
    // toggleFollowing
    countOfDisplayingPages: number
    isFetching: boolean

    // onPageChanged:
    unFollow: () => void
    follow: () => void
    getUsers: (usersPerPage: number, currentPage: number) => void
}

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const {usersPerPage, currentPage} = this.props;
    this.props.getUsers(usersPerPage, currentPage)
  }

  onPageChanged = (pageNumber: number) => {
    const {usersPerPage} = this.props;
    this.props.getUsers(usersPerPage, pageNumber)
  }

  render() {
    return (
        <>
          <Users
              totalUsersCount = {this.props.totalUsersCount}
              usersPerPage = {this.props.usersPerPage}
              currentPage = {this.props.currentPage}
              users = {this.props.users}
              unFollow = {this.props.unFollow}
              follow = {this.props.follow}
              usersWithToggleFollowing = {this.props.usersWithToggleFollowing}
              // toggleFollowing = {this.props.toggleFollowing}
              countOfDisplayingPages = {this.props.countOfDisplayingPages}
              onPageChanged = {this.onPageChanged} />
          { this.props.isFetching ? <Preloader /> : null }
        </>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  // console.log("USERS MAPSTATE")
  return {
    users: setUsersSelector(state),
    usersPerPage: state.usersPage.usersPerPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    usersWithToggleFollowing: state.usersPage.usersWithToggleFollowing,
    countOfDisplayingPages: state.usersPage.countOfDisplayingPages,
    // paginatorPagesBlockNumber: state.usersPage.paginatorPagesBlockNumber
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
//@ts-ignore
(UsersContainer);
