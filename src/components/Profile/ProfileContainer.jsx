import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo, getUserStatus, updateStatus} from "../../store/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

  componentDidMount() {
    const userID = this.props.match.params.userID || 2;
    this.props.getProfileInfo(userID);
    this.props.getUserStatus(userID);
  }

  render() {
    return (
        <div>
          <Profile {...this.props}
                   profile = {this.props.profile}
                   status = {this.props.status}
                   updateStatus={this.props.updateStatus} />
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
})


export default compose(
    connect(mapStateToProps, {getProfileInfo, getUserStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)