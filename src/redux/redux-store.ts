import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {fakeReducer} from "./fake-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  fake: fakeReducer
});

type reducersType = typeof reducers; //  вернёт что-то вроде функции (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<reducersType>  // определить тип возвращаемого значения

// const state: AppStateType; // задаём тип нашего стейта
// state.profilePage.   // теперь при обращении с стейту будет появляться подсказка

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));

// const store = createStore(reducers, applyMiddleware(thunk));

// @ts-ignore
window.store = store; // чтобы посмотреть redux в консоли пишем redux.getState()

export default store;