import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo} from "../../store/profile-reducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

  componentDidMount() {
    const userID = this.props.match.params.userID || 2;
    this.props.getProfileInfo(userID);
  }

  render() {
    return (
        <div>
          <Profile {...this.props} profile = {this.props.profile}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile
})


const ProfileContainerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  getProfileInfo
})(ProfileContainerWithRouter);
