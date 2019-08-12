import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = (props) => {
  const username = {
    id: 'username',
    type: props.username.type,
    value: props.username.value,
    onChange: props.username.onChange
  }

  const password = {
    id: 'password',
    type: props.password.type,
    value: props.password.value,
    onChange: props.password.onChange
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const res = props.loginUser(username.value, password.value)
    // Check if login throwed an exception, if yes set notification.
    res.then(exception => {
      if(exception){
        props.setNotification(exception,5,true)
      }
    })
    props.username.reset()
    props.password.reset()
  }

  return (
    <div className='loginForm'>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default connect(
  null,
  { loginUser,
    setNotification
  }
)(LoginForm)