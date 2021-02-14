import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./state/state";
import App from "./App";

let rerenderEntireTrees = () => {
  ReactDOM.render(
      <React.StrictMode>
        <App store = { store.getState() }
             dispatch = { store.dispatch.bind(store) }
             // addPost = { store.addPost.bind(store) }
             // updateNewPostText = { store.updateNewPostText.bind(store) }
             // addMessage = { store.addMessage.bind(store) }
             // updateMessageText = { store.updateMessageText.bind(store) }
        />
      </React.StrictMode>,
      document.getElementById('root')
  );
}

rerenderEntireTrees();

store.subscribe(rerenderEntireTrees);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
