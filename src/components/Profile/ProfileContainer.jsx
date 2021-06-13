import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo, profileActions, savePhoto, setProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  refreshProfile() {
    const userID = this.props.match.params.userID || this.props.autorizedUserId || this.props.history.push("/login");
    this.props.getProfileInfo(userID);
    this.props.requestStatus(userID);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile()
    }
  }

  render() {
    return (
        <div>
          <Profile {...this.props}
                   profile = {this.props.profile}
                   status = {this.props.status}
                   updateStatus = {this.props.updateStatus}
                   isMyProfilePage = {!this.props.match.params.userID}
                   savePhoto = {this.props.savePhoto}
                   setProfile = {this.props.setProfile}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id
  }
}

export default compose(
    connect(mapStateToProps, {getProfileInfo, requestStatus: profileActions.requestStatus, updateStatus, savePhoto: savePhoto, setProfile}),
    withRouter
)(ProfileContainer)
