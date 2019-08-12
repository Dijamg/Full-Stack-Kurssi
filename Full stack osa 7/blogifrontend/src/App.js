import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import Blog from './components/Blog'
import  { useField } from './hooks'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser, logoutUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import BlogsByUser from './components/BlogsByUser'


const Navigation = (props) => {
  const padding = {
    paddingRight: 10
  }
  return (
    <div className='navigation'>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {props.user.name} logged in <button onClick ={() => props.logoutUser()}>log out</button>
    </div>
  )
}
const App =(props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    props.getUser()
  }, [])

  const loginForm = () => {

    return (
      <div>
        <LoginForm
          username={username}
          password={password}
        />
      </div>
    )
  }
  if(props.user === null){
    return(
      <div>
        <Notification />
        {loginForm()}
      </div>
    )
  }else{
    return(
      <div>
        <Router>
          <Navigation user={props.user} logoutUser={() => props.logoutUser()}/>
          <Notification />
          <h2>blogs</h2>

          <Route exact path="/" render={() => <BlogList user={props.user} />} />
          <Route exact path="/users" render={() => <UsersList/>} />
          <Route exact path="/users/:id" render={({ match }) =>
            <BlogsByUser id={match.params.id} />
          } />
          <Route path="/blogs/:id" render={({ match }) =>
            <Blog id={match.params.id} showFull ={true} currentUser ={props.user} />
          } />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeBlogs, getUser, logoutUser })(App)
