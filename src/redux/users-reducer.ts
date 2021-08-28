import {updateObjectInArray} from "../Utils/object-helpers";
import {UserType} from "../Types/types";
import {InferActionsTypes, PrimaryThunkType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {PrimaryResponseType, ResultCodesEnum} from "../api/api";

export const usersActions = {
    followSuccess: (id:number) => ({type: "users/FOLLOW",id} as const),
    unFollowSuccess: (id:number) => ({type: "users/UNFOLLOW",id} as const),
    setUsers: (users: Array<UserType>) => ({type: "users/SET_USERS",users: users} as const),
    setTotalUsersCount: (number:number) => ({type: "users/SET_USERS_TOTAL_COUNT",totalUsersCount: number} as const),
    setCurrentPage: (pageNumber:number) => ({type: "users/SET_CURRENT_PAGE",currentPageNumber: pageNumber} as const),
    toggleIsFetching: (isFetching:boolean) => ({type: "users/TOGGLE_FETCHING",isFetching: isFetching} as const),
    toggleFollowing: (isFetching:boolean, id:number) => ({type: "users/TOGGLE_FOLLOWING_PROGRESS",isFetching: isFetching, id} as const),
    setFilter: (term: string) => ({type: "users/SET_FILTER", term} as const)
}

const initialState = {
    users: [] as Array<UserType>,
    usersPerPage: 100,
    currentPageNumber: 1,
    totalUsersCount: 0,
    isFetching: true,
    usersWithToggleFollowing: [] as Array<number>, //array of users id
    countOfDisplayingPages: 10,
    term: ''
}

export const getUsers = (usersPerPage: number, currentPageNumber: number, term: string): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(usersActions.toggleIsFetching(true));
        dispatch(usersActions.setFilter(term));
        dispatch(usersActions.setCurrentPage(currentPageNumber));
        const response = await usersAPI.getUsers(usersPerPage, currentPageNumber, term);  // TS не подсказывает response.items... ((
        dispatch(usersActions.toggleIsFetching(false));
        dispatch(usersActions.setUsers(response.items));
        dispatch(usersActions.setTotalUsersCount(response.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   apiMethod: (id: number) => Promise<PrimaryResponseType>,
                                   actionCreator: (id: number) => ActionsTypes,
                                   id: number) => {
    dispatch(usersActions.toggleFollowing(true, id));
    const response = await apiMethod(id);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(id));
        dispatch(usersActions.toggleFollowing(false, id));
    };
}

export const unFollow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unFollow.bind(usersAPI);
        await _followUnfollowFlow(dispatch, apiMethod, usersActions.unFollowSuccess, id);
    }
}

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI);
        await _followUnfollowFlow(dispatch, apiMethod, usersActions.followSuccess, id);
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
            }
        case "users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
            }
        case "users/SET_USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        case "users/SET_USERS_TOTAL_COUNT": {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case "users/SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPageNumber: action.currentPageNumber
            }
        }
        case "users/TOGGLE_FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "users/TOGGLE_FOLLOWING_PROGRESS": {
            return {
                ...state,
                usersWithToggleFollowing: action.isFetching
                    ? [...state.usersWithToggleFollowing, action.id]
                    : [...state.usersWithToggleFollowing.filter(el => el !== action.id)]
            }
        }
        case "users/SET_FILTER": {
            return {
                ...state,
                term: action.term
            }
        }
        default:
            return state;
    }
}

export default usersReducer;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof usersActions>;
type ThunkType = PrimaryThunkType<ActionsTypes>;
