import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  username = {
    type: username.type,
    value: username.value,
    onChange: username.onChange
  }

  password = {
    type: password.type,
    value: password.value,
    onChange: password.onChange
  }

  return (
    <div className='loginForm'>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm