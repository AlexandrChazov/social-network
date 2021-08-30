import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo, profileActions, setPhoto, setProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../Types/types";
import {FormValues} from "./ProfileInfo/ProfileDataForm";
import {PrimaryResponseType} from "../../api/api";
import withAuthRedirect from "../../Hoc/withAuthRedirect";

type MapStatePropsType = {
  profile: ProfileType
  status: string
  autorizedUserId: number
}

type DispatchPropsType = {
  getProfileInfo: (userID :string|number|void)=> void,
  requestStatus: (userID :string|number|void)=> void,
  updateStatus: (status: string)=> void,
  setPhoto: (event: ChangeEvent<HTMLInputElement>)=> void,
  setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

type PathParamsType = {
  userID: string | undefined
}

type PropsType = MapStatePropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    const userID = this.props.match.params.userID || this.props.autorizedUserId || this.props.history.push("/login");
    this.props.getProfileInfo(userID);
    this.props.requestStatus(userID);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
                   setPhoto = {this.props.setPhoto}
                   setProfile = {this.props.setProfile}/>
        </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id
  }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfileInfo, requestStatus: profileActions.requestStatus, updateStatus, setPhoto: setPhoto, setProfile}),
    withRouter,
  withAuthRedirect
)(ProfileContainer)
