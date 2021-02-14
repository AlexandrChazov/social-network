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
                                                          addPost = { props.addPost }
                                                          updateNewPostText = { props.updateNewPostText }
                                                          textareaValue = { props.store.profilePage.textareaValue }/> }/>
          <Route path="/Dialogs" render={ () => <Dialogs dialog = {props.store.dialogsPage.dialogs}
                                                         message = {props.store.dialogsPage.messages}
                                                         addMessage = { props.addMessage }
                                                         updateMessageText = { props.updateMessageText }
                                                         newMessage = {props.store.dialogsPage.newMessage } /> }/>
          <Route path="/News" render={ () => <News/> }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
