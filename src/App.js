import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import News from "./components/News/News";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <NavbarContainer store = { props.store }/>
        <div className="app-wrapper-content">
          <Route path="/Profile" render={ () => <Profile store = { props.store } /> }/>
          <Route path="/Dialogs" render={ () => <DialogsContainer store = { props.store } /> }/>
          <Route path="/News" render={ () => <News/> }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
