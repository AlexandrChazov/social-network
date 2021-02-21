import React from 'react';
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../store/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

// const DialogsContainer = (props) => {
//
//   const state = props.store.getState();
//
//   const onSendMessage = (text) => {
//     const action = sendMessageActionCreator(text);
//     props.store.dispatch(action);
//   }
//
//   const onMessageChange = (text) => {
//     const action = onMessageChangeActionCreator(text);
//     props.store.dispatch(action);
//   }
//
//     return (
//         <Dialogs
//           newMessage = { state.dialogsPage.newMessage }
//           dialog = { state.dialogsPage.dialogs }
//           message = { state.dialogsPage.messages }
//           messageChange = { onMessageChange }
//           sendMessage = { onSendMessage } />
//     )
// }

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageChange: (text) => {
      const action = onMessageChangeActionCreator(text);
      dispatch(action);
    },
    sendMessage: () => {
      const action = sendMessageActionCreator();
      dispatch(action);
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;