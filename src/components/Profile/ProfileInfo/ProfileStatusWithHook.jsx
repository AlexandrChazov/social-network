import React, {useEffect, useState} from "react";

const ProfileStatus = React.memo(props => {

  const [isEditModeOn, setEditMode] = useState(false);

  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const onStatusChange = (e) => {
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
})

export default ProfileStatus;