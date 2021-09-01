import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatus} from "../../../redux/profile-reducer";

type PropsType = {
  status:string
}

const ProfileStatus: React.FC<PropsType> = (props) => {

  const dispatch = useDispatch();
  const updateStatus_ = (status: string) => {
    dispatch(updateStatus(status))
  }

  const [isEditModeOn, setEditMode] = useState(false);

  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }
  //
  const editModeOn = () => {
    setEditMode(true)
  }
  //
  const editModeOff = () => {
    setEditMode(false);
    updateStatus_(status)
  }

    return (
        <div>
          {
            isEditModeOn
                ? <div><input onChange={onStatusChange} autoFocus={true} onBlur={editModeOff} type="text" value = {status} /></div>
                : <div onDoubleClick={editModeOn}> {props.status} </div>
          }
        </div>
    )
}

export default ProfileStatus;