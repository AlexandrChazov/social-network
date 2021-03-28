import React from 'react';
import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../store/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)