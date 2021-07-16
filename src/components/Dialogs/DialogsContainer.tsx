import {dialogsActions, InitialStateType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapPropsType = {
  dialogsPage: InitialStateType
}

type DispatchPropsType = {
  sendMessage: (myMessage: string) => void
}

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose(
    connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
        mapStateToProps,
        {sendMessage: dialogsActions.sendMessage}),
    withAuthRedirect
)(Dialogs)
