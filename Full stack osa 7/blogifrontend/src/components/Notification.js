import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const isNull = props.notification === null
  const style = props.isError ? 'error' : 'success'
  const noStyle = {

  }
  return (
    <div className={!isNull ? style : noStyle}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification,
    isError: state.notification.isError
  }
}

const ConnectedNotifications = connect(
  mapStateToProps
)(Notification)
export default ConnectedNotifications