import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store; // чтобы посмотреть store в консоли пишем store.getState()

export default store;