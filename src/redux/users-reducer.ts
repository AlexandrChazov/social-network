import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utils/object-helpers";
import {UserType} from "../Types/types";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

const FOLLOW = "social-network/users/FOLLOW";
const UNFOLLOW = "social-network/users/UNFOLLOW";
const SET_USERS = "social-network/users/SET_USERS";
const SET_USERS_TOTAL_COUNT = "social-network/users/SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "social-network/users/SET_CURRENT_PAGE";
const TOGGLE_FETCHING = "social-network/users/TOGGLE_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "social-network/users/TOGGLE_FOLLOWING_PROGRESS";

type FollowSuccessActionType = {
    type: typeof FOLLOW
    id: number
}

export const followSuccess = (id: number): FollowSuccessActionType => ({
    type: FOLLOW,
    id: id
})

type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    id: number
}

export const unFollowSuccess = (id: number): UnFollowSuccessActionType => ({
    type: UNFOLLOW,
    id: id
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users: users
})

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalUsersCount: number
}

export const setTotalUsersCount = (number: number): SetTotalUsersCountActionType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalUsersCount: number
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPageNumber: number,
}

export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPageNumber: pageNumber,
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean,
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_FETCHING,
    isFetching: isFetching,
})

type ToggleFollowingActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    isFetching: boolean
    id: number
}

export const toggleFollowing = (isFetching: boolean, id: number): ToggleFollowingActionType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    id: id
})

const initialState = {
    users: [] as Array<UserType>,
    usersPerPage: 100,
    currentPageNumber: 1,
    totalUsersCount: 0,
    isFetching: true,
    usersWithToggleFollowing: [] as Array<number>, //array of users id
    countOfDisplayingPages: 10
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;

export const getUsers = (usersPerPage: number, currentPageNumber: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(usersPerPage, currentPageNumber);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setCurrentPage(currentPageNumber))
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   apiMethod: any,
                                   actionCreator: (id: number)=> FollowSuccessActionType | UnFollowSuccessActionType,
                                   id: number) => {
    dispatch(toggleFollowing(true, id));
    const data = await apiMethod(id);
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
        dispatch(toggleFollowing(false, id));
    }
}

export const unFollow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unFollow.bind(usersAPI);
        _followUnfollowFlow(dispatch, apiMethod, unFollowSuccess, id);
    }
}

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI);
        _followUnfollowFlow(dispatch, apiMethod, followSuccess, id);
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

type InitialStateType = typeof initialState;

type ActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType
    | SetTotalUsersCountActionType | SetCurrentPageActionType | ToggleIsFetchingActionType
    | ToggleFollowingActionType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
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
                currentPageNumber: action.currentPageNumber
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
