const notificationReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
} 

export const setNotification = (notification, duration) => {
    return async dispatch => {
        await dispatch(notificationChange(notification))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, 1000 * duration)     
    }
}  

export const notificationChange = notification => {
    return{
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const notificationRemove = () => {
    return{
        type: 'RESET_NOTIFICATION'
    }
}

export default notificationReducer