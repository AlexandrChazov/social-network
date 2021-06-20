import {dialogsActions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose(
    connect(mapStateToProps, {sendMessage: dialogsActions.sendMessage}),
    withAuthRedirect
)(Dialogs)
