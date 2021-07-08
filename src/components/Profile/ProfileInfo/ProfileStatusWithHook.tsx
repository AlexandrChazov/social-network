import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
  status:string
  updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = props => {

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
    props.updateStatus(status)
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