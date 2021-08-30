import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
// import withAuthRedirect from "../Hoc/withAuthRedirect";
import {getIsFetching} from "../../redux/users-selectors";

type OwnPropsType = {
    title: string       // тут указываются пропсы, переданные через атрибуты
}

export const UsersPage: React.FC<OwnPropsType> = (props) => {

  const isFetching = useSelector(getIsFetching);

  return (
      <>
        <div>{props.title}</div>
        <Users/>
        { isFetching ? <Preloader /> : null }
      </>
  )
}