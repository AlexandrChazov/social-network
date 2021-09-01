import {AppStateType} from "./redux-store";

export const getAutorizedUserId = (state: AppStateType) => {
  return state.auth.id
}