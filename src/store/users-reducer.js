import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

export const followSuccess = (id) => ({
  type: FOLLOW,
  id: id
})

export const unFollowSuccess = (id) => ({
  type: UNFOLLOW,
  id: id
})

export const setUsers = (users) => ({
  type: SET_USERS,
  users: users
})

export const setTotalUsersCount = (number) => ({
  type: SET_USERS_TOTAL_COUNT,
  totalUsersCount: number
})

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  currentPage: page,
})

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_FETCHING,
  isFetching: isFetching,
})

export const toggleFollowing = (isFetching, id) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isFetching: isFetching,
  id: id
})

const initialState = {
  users: [],
  pageSize: 5,
  currentPage: 64,
  totalUsersCount: 0,
  isFetching: true,
  usersWithToggleFollowing: []
}

export const getUsers = (pageSize, currentPage) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(pageSize, currentPage).then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setCurrentPage(currentPage))
      dispatch(setTotalUsersCount(data.totalCount));
    })
  }
}

export const unFollow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowing(true, id));
    usersAPI.unFollow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unFollowSuccess(id));
        dispatch(toggleFollowing(false, id));
      }
    })
  }
}

export const follow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowing(true, id));
    usersAPI.follow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(id));
        dispatch(toggleFollowing(false, id));
      }
    })
  }
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state, users: state.users.map( el => {
          if (el.id === action.id) {
            return { ...el, followed: true }
          }
          return el;
        })
      }
    case UNFOLLOW:
      return {
        ...state, users: state.users.map( el => {
          if (el.id === action.id) {
            return {...el, followed: false}
          }
          return el;
        })
      }
    case SET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    case SET_USERS_TOTAL_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case TOGGLE_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        usersWithToggleFollowing: action.isFetching
            ? [...state.usersWithToggleFollowing, action.id]
            : [...state.usersWithToggleFollowing.filter(el => el !== action.id)]
      }
    }
    default:
      return state;
  }
}

export default usersReducer;