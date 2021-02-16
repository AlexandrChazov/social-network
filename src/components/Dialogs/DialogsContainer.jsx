import React from 'react';
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../store/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

  const state = props.store.getState();

  const onSendMessage = (text) => {
    const action = sendMessageActionCreator(text);
    props.store.dispatch(action);
  }

  const onMessageChange = (text) => {
    const action = onMessageChangeActionCreator(text);
    props.store.dispatch(action);
  }

    return (
        <Dialogs
          newMessage = { state.dialogsPage.newMessage }
          dialog = { state.dialogsPage.dialogs }
          message = { state.dialogsPage.messages }
          messageChange = { onMessageChange }
          sendMessage = { onSendMessage } />
    )
}

export default DialogsContainer;