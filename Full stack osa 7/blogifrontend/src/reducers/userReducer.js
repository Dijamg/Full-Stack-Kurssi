import loginService from '../services/login'
import blogService from '../services/blogs'

export const loginUser = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }catch(exception){
      return exception.response.data.error
    }
  }
}

export const getUser = () => {
  return dispatch => {
    let user = null
    if (window.localStorage.getItem('loggedBlogAppUser')) {
      user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
      blogService.setToken(user.token)
    }
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    try{
      window.localStorage.clear()
      dispatch({
        type: 'LOGOUT'
      })
    }catch(e){
      console.log(e)
    }
  }
}

const userReducer = (state = null, action) => {
  switch(action.type){
  case 'LOGIN':
    return action.data

  case 'GET_USER':
    return action.data

  case 'LOGOUT':
    return null

  default:
    return state
  }
}

export default userReducer
