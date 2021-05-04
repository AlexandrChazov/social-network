import React from 'react';
import './App.css';
import News from "./components/News/News";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render () {
    if (!this.props.isInitialized) {
      return <Preloader/>
    }
    return (
      <BrowserRouter>
        <div className="app">
          <HeaderContainer />
          <NavbarContainer />
          <div className="app-wrapper-content">
            <Route path="/Profile/:userID?" render={ () => <ProfileContainer /> } />
            <Route path="/Dialogs" render={ () => <DialogsContainer /> } />
            <Route path="/News" render={ () => <News /> } />
            <Route path="/Users" render={ () => <UsersContainer /> } />
            <Route path="/Login" render={ () => <LoginContainer /> } />
          </div>
        </div>
      </BrowserRouter>
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
        <Provider store = { store } >
          <AppContainer />
        </Provider>
      </React.StrictMode>
  )
}

export default MainApp;