import React, {useState} from "react";

const ProfileStatus = (props) => {

  const [isEditModeOn, setEditMode] = useState(false);

  const [status, setStatus] = useState(props.status);

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.status !== this.props.status) {
  //     this.setState({
  //       status: this.props.status
  //     })
  //   }
  // }
  //
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
                ? <div >  <input onChange={onStatusChange} autoFocus={true} onBlur={editModeOff} type="text" value = {status} />  </div>
                : <div onDoubleClick={editModeOn}> {status} </div>
          }
        </div>
    )
}

export default ProfileStatus;