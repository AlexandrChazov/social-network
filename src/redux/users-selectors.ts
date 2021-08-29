import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const setUsers = (state: AppStateType) => {
  return state.usersPage.users
}

export const setUsersSelector = createSelector(setUsers, users => users.filter(el => true))


const setFilter = (state: AppStateType) => {
  return state.usersPage
}

export const getUsersFilter = createSelector(setFilter, usersPage => usersPage.filter)
