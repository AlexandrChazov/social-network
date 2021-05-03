import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo, getUserStatus, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  componentDidMount() {
    const userID = this.props.match.params.userID || this.props.autorizedUserId || this.props.history.push("/login");
    this.props.getProfileInfo(userID);
    this.props.getUserStatus(userID);
  }

  render() {
    return (
        <div>
          <Profile {...this.props}
                   profile = {this.props.profile}
                   status = {this.props.status}
                   updateStatus = {this.props.updateStatus} />
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
    connect(mapStateToProps, {getProfileInfo, getUserStatus, updateStatus}),
    withRouter
)(ProfileContainer)