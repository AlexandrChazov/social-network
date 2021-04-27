import {createSelector} from "reselect";


const setUsers = (state) => {
  return state.usersPage.users
}

export const setUsersSelector = createSelector(setUsers, users => users.filter(el => true))