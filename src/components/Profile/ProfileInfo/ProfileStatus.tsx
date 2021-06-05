import React, {ChangeEvent} from "react";

type PropsType = {
  status: string
  updateStatus: (status: string) => void
};

type StateType = {
  isEditModeOn: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  editModeOn = () => {
    this.setState({
        isEditModeOn: true
    })
  }

  editModeOff = () => {
    this.setState({
        isEditModeOn: false
    })
    this.props.updateStatus(this.state.status)
  }

  state = {
    isEditModeOn: false,
    status: this.props.status
  }

  render() {
    return (
      <div>
        {
          this.state.isEditModeOn
            ? <div >  <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.editModeOff} type="text" value = {this.state.status} />  </div>
            : <span onDoubleClick={this.editModeOn}> {this.state.status} </span>
        }
      </div>
    )
  }
}

export default ProfileStatus;
