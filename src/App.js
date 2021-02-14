import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import { BrowserRouter, Route } from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <Navbar friends = { props.store.sidebar }/>
        <div className="app-wrapper-content">
          <Route path="/Profile" render={ () => <Profile  chat = {props.store.profilePage.chats}
                                                          textareaValue = { props.store.profilePage.textareaValue }
                                                          // updateNewPostText = { props.updateNewPostText }
                                                          // addPost = { props.addPost }
                                                          dispatch = { props.dispatch } /> }/>
          <Route path="/Dialogs" render={ () => <Dialogs dialog = {props.store.dialogsPage.dialogs}
                                                         message = {props.store.dialogsPage.messages}
                                                         newMessage = {props.store.dialogsPage.newMessage }
                                                         // addMessage = { props.addMessage }
                                                         // updateMessageText = { props.updateMessageText }
                                                         dispatch = { props.dispatch } /> }/>
          <Route path="/News" render={ () => <News/> }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
