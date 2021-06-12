import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utils/object-helpers";
import {UserType} from "../Types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

const FOLLOW = "social-network/users/FOLLOW";
const UNFOLLOW = "social-network/users/UNFOLLOW";
const SET_USERS = "social-network/users/SET_USERS";
const SET_USERS_TOTAL_COUNT = "social-network/users/SET_USERS_TOTAL_COUNT";
const SET_CURRENT_PAGE = "social-network/users/SET_CURRENT_PAGE";
const TOGGLE_FETCHING = "social-network/users/TOGGLE_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "social-network/users/TOGGLE_FOLLOWING_PROGRESS";

const actions = {
    followSuccess: (id:number) => ({type: FOLLOW,id} as const),
    unFollowSuccess: (id:number) => ({type: UNFOLLOW,id} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS,users: users} as const),
    setTotalUsersCount: (number:number) => ({type: SET_USERS_TOTAL_COUNT,totalUsersCount: number} as const),
    setCurrentPage: (pageNumber:number) => ({type: SET_CURRENT_PAGE,currentPageNumber: pageNumber} as const),
    toggleIsFetching: (isFetching:boolean) => ({type: TOGGLE_FETCHING,isFetching: isFetching} as const),
    toggleFollowing: (isFetching:boolean, id:number) => ({type: TOGGLE_FOLLOWING_PROGRESS,isFetching: isFetching,id} as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>;

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
        dispatch(actions.toggleIsFetching(true));
        const response = await usersAPI.getUsers(usersPerPage, currentPageNumber);  // TS не подсказывает response.items... ((
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setCurrentPage(currentPageNumber))
        dispatch(actions.setTotalUsersCount(response.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   apiMethod: any,
                                   actionCreator: (id: number) => ActionsTypes,
                                   id: number) => {
    dispatch(actions.toggleFollowing(true, id));
    const data = await apiMethod(id);
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
        dispatch(actions.toggleFollowing(false, id));
    }
    ;
}

export const unFollow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unFollow.bind(usersAPI);
        _followUnfollowFlow(dispatch, apiMethod, actions.unFollowSuccess, id);
    }
}

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI);
        _followUnfollowFlow(dispatch, apiMethod, actions.followSuccess, id);
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
