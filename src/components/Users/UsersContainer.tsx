import React from "react";
import {unFollow, follow, getUsers, FilterType} from "../../redux/users-reducer";
import { connect } from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {getUsersFilter, setUsersSelector} from "../../redux/users-selectors";
import {UserType} from "../../Types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    totalUsersCount: number
    usersPerPage: number
    currentPageNumber: number
    users: Array<UserType>
    usersWithToggleFollowing: Array<number>
    countOfDisplayingPages: number
    isFetching: boolean
    filter: FilterType
}

type MapDispatchPropsType = {
    unFollow: (id:number) => void
    follow: (id:number) => void
    getUsers: (usersPerPage: number, currentPageNumber: number, filter: FilterType) => void
}

type OwnPropsType = {
    title: string                       // тут указываются пропсы, переданные через атрибуты
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;  // PropsType состоит из нескольких типов

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const {usersPerPage, currentPageNumber, filter} = this.props;
    this.props.getUsers(usersPerPage, currentPageNumber, filter)
  }

  onPageChanged = (pageNumber: number) => {
    const {usersPerPage, filter} = this.props;
    this.props.getUsers(usersPerPage, pageNumber, filter)
  }

  render() {
    return (
        <>
          <div>{this.props.title}</div>
          <Users
              totalUsersCount = {this.props.totalUsersCount}
              usersPerPage = {this.props.usersPerPage}
              currentPageNumber = {this.props.currentPageNumber}
              users = {this.props.users}
              unFollow = {this.props.unFollow}
              follow = {this.props.follow}
              usersWithToggleFollowing = {this.props.usersWithToggleFollowing}
              // toggleFollowing = {this.props.toggleFollowing}
              countOfDisplayingPages = {this.props.countOfDisplayingPages}
              onPageChanged = {this.onPageChanged}
              filter={this.props.filter}
              getUsers = {this.props.getUsers}/>
          { this.props.isFetching ? <Preloader /> : null }
        </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  // console.log("USERS MAPSTATE")
  return {
    users: setUsersSelector(state),
    usersPerPage: state.usersPage.usersPerPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPageNumber: state.usersPage.currentPageNumber,
    isFetching: state.usersPage.isFetching,
    usersWithToggleFollowing: state.usersPage.usersWithToggleFollowing,
    countOfDisplayingPages: state.usersPage.countOfDisplayingPages,
    filter: getUsersFilter(state)
    // paginatorPagesBlockNumber: state.usersPage.paginatorPagesBlockNumber
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    unFollow,
    follow,
    getUsers
  })
)(UsersContainer);
