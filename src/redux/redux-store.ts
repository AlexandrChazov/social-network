import {applyMiddleware, combineReducers, createStore, compose, Action} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import profileReducer, {sagaWatcher} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {appReducer} from "./app-reducer";
import fakeReducer from "./fake-reducer";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

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

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {[key:string]:(...args:any[])=>any}> = ReturnType<InferValueTypes<T>>

export type PrimaryThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // подключаем REDUX DEVTOOLS
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(sagaWatcher);

// @ts-ignore
window.store = store; // чтобы посмотреть redux в консоли пишем redux.getState()

export default store;
