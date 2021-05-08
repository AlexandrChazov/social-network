import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utils/object-helpers";

const FOLLOW = "social-network/users/FOLLOW";
const UNFOLLOW = "social-network/users/UNFOLLOW";
const SET_USERS = "social-network/users/SET_USERS";
const SET_USERS_TOTAL_COUNT = "social-network/users/SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "social-network/users/SET_CURRENT_PAGE";
const TOGGLE_FETCHING = "social-network/users/TOGGLE_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "social-network/users/TOGGLE_FOLLOWING_PROGRESS";

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
  usersPerPage: 5,
  currentPage: 1,
  totalUsersCount: 0,
  isFetching: true,
  usersWithToggleFollowing: [],
  countOfDisplayingPages: 10
}

export const getUsers = (pageSize, currentPage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setCurrentPage(currentPage))
    dispatch(setTotalUsersCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch, apiMethod, actionCreator, id) => {
  dispatch(toggleFollowing(true, id));
  const data = await apiMethod(id);
  if (data.resultCode === 0) {
    dispatch(actionCreator(id));
    dispatch(toggleFollowing(false, id));
  }
}

export const unFollow = (id) => {
  return (dispatch) => {
    const apiMethod = usersAPI.unFollow.bind(usersAPI);
    followUnfollowFlow(dispatch, apiMethod, unFollowSuccess, id);
  }
}

export const follow = (id) => {
  return (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    followUnfollowFlow(dispatch, apiMethod, followSuccess, id);
  }
}

// const setFollowing = (state, action, isFollowed ) => {
//   return {
//     ...state, users: state.users.map(el => {
//           if (el.id === action.id) {
//             return {...el, followed: isFollowed}
//           }
//           return el
//         }
//     )
//   }
// }

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.id, "id", {followed: true} )
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.id, "id", {followed: false} )
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