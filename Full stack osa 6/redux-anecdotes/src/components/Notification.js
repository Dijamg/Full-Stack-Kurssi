import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const isNull = props.notification === null
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const noStyle = {

  }
  return (
    <div style={!isNull ? style : noStyle}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    notification: state.notification,
  }
}

const ConnectedNotifications = connect(
  mapStateToProps
)(Notification)
export default ConnectedNotifications