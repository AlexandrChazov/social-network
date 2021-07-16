import Navbar from "./Navbar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {FriendsArrayType} from "../../redux/sidebar-reducer";

type MapStateType = {
  friends: Array<FriendsArrayType>
}

const mapStateToProps = (state: AppStateType) => {
  return {
    friends: state.sidebar.friends
  }
}

export default connect<MapStateType, {}, {}, AppStateType>(mapStateToProps)(Navbar)


