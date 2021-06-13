import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const setUsers = (state: AppStateType) => {
  return state.usersPage.users
}

export const setUsersSelector = createSelector(setUsers, users => users.filter(el => true))
