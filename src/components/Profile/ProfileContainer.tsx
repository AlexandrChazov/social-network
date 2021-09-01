import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";
import {getProfileInfo, profileActions, setProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, useParams, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {FormValues} from "./ProfileInfo/ProfileDataForm";
import {PrimaryResponseType} from "../../api/api";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {getAutorizedUserId} from "../../redux/auth-selectors";

type MapStatePropsType = {}

type DispatchPropsType = {
  setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

type PathParamsType = {
}

type ParamsType = {
  userID: string
}

type PropsType = MapStatePropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

const ProfileContainer: React.FC<PropsType> = (props) => {

  const params:ParamsType = useParams();
  const userID = +params.userID;
  const autorizedUserId = useSelector(getAutorizedUserId);

  const dispatch = useDispatch();
  const getProfileInfo_ = (userID: number) => {
    dispatch(getProfileInfo(userID))
  };
  const requestStatus = (userID: number) => {
    dispatch(profileActions.requestStatus(userID))
  }

  const refreshProfile = () => {
    if (userID) {
      getProfileInfo_(userID);
      requestStatus(userID);
    } else if (autorizedUserId) {
      getProfileInfo_(autorizedUserId);
      requestStatus(autorizedUserId);
    } else {
      props.history.push("/login");
    }
  }

  useEffect(() => {
    refreshProfile()
  }, []);

  useEffect(() => {
    refreshProfile()
  }, [userID])

  return (
    <div>
      <Profile {...props}
               isMyProfilePage={!userID}
               setProfile={props.setProfile}/>
    </div>
  )
}

const mapStateToProps = () => {
  return {
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setProfile
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
