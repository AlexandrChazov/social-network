import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const setUsersPerPage = (state: AppStateType) => state.usersPage.usersPerPage;
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getUsersWithToggleFollowing = (state: AppStateType) => state.usersPage.usersWithToggleFollowing;
export const getCurrentPageNumber = (state: AppStateType) => state.usersPage.currentPageNumber;
export const getCountOfDisplayingPages = (state: AppStateType) => state.usersPage.countOfDisplayingPages;
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;

const setUsers = (state: AppStateType) => state.usersPage.users;
export const setUsersSelector = createSelector(setUsers, users => users.filter(el => true))

const setFilter = (state: AppStateType) => state.usersPage;
export const getUsersFilter = createSelector(setFilter, usersPage => usersPage.filter)
