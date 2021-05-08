import React from 'react';
import './App.css';
import News from "./components/News/News";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const LoginContainer = React.lazy(() => import("./components/Login/LoginContainer"));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
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
              <Route path="/Profile/:userID?" render={() => <ProfileContainer/>}/>
              <Route path="/Dialogs" render={withSuspense(DialogsContainer)}/>
              <Route path="/News" render={() => <News/>}/>
              <Route path="/Users" render={() => <UsersContainer/>}/>
              <Route path="/Login" render={withSuspense(LoginContainer)}/>
            </div>
          </div>
        </HashRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized
})

// export default connect(mapStateToProps, {initializeApp})(App);

const AppContainer = connect(mapStateToProps, {initializeApp})(App);

const MainApp = (props) => {
  return (
      <React.StrictMode>
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      </React.StrictMode>
  )
}

export default MainApp;