import React from 'react';
import './App.css';
import News from "./components/News/News";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import {UsersPage} from "./components/Users/UsersPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));
const ChatPage = React.lazy(() => import("./components/pages/Chat/ChatPage"))

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedLogin = withSuspense(Login);
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = () => {
    alert("Some error occurred")
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.isInitialized) {
      return <Preloader/>
    }
    return (
        <HashRouter>
          <div className="app">
            <HeaderContainer/>
            <NavbarContainer/>
            <div className="app-wrapper-content">
              <Switch>
                <Redirect exact from="/" to="/profile" />
                <Route path="/Profile/:userID?" render={() => <ProfileContainer/>}/>
                {/*<Route path="/Dialogs" render={() => withSuspense(DialogsContainer)}/> заменяем строчкой ниже, т.к. TS хочет видеть тут отрисовку компоненты, а не вызов функции*/}
                <Route path="/Dialogs" render={() => <SuspendedDialogs/>}/>
                <Route path="/News" render={() => <News/>}/>
                <Route path="/Users" render={() => <UsersPage title="Список пользователей" />}/>
                {/*<Route path="/Login" render={() => withSuspense(LoginContainer)}/> заменяем строчкой ниже, т.к. TS хочет видеть тут отрисовку компоненты, а не вызов функции*/}
                <Route path="/Login" render={() => <SuspendedLogin/>} />
                <Route path="/Chat" render={() => <SuspendedChatPage/>} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
              </Switch>
            </div>
          </div>
        </HashRouter>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isInitialized: state.app.isInitialized
})

// export default connect(mapStateToProps, {initializeApp})(App);

const AppContainer = connect(mapStateToProps, {initializeApp})(App) as React.ComponentType;

const MainApp = () => {
  return (
      <React.StrictMode>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </React.StrictMode>
  )
}

export default MainApp;
