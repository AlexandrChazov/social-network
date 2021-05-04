import React from "react";

class ProfileStatus extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  onStatusChange = (e) => {
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