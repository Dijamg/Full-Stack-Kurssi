const initialState = {
  notification: null,
  isError: true
}
const notificationReducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    return ({
      notification : action.notification,
      isError : action.isError
    })
  case 'RESET_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const setNotification = (notification, duration, isError) => {
  return async dispatch => {
    await dispatch(notificationChange(notification,isError))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 1000 * duration)
  }
}

export const notificationChange = (notification,isError) => {
  return{
    type: 'SET_NOTIFICATION',
    notification: notification,
    isError: isError
  }
}

export const notificationRemove = () => {
  return{
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer