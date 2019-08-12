import React, { useState } from 'react'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import CreateForm from './CreateForm'
import  { useField } from '../hooks'

const BlogList = (props) => {
  const [addVisible, setAddVisible] = useState(false)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createForm = () => {
    const hideWhenVisible = { display: addVisible ? 'none' : '' }
    const showWhenVisible = { display: addVisible ? '' : 'none' }
    return(
      <div className='createForm'>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddVisible(true)}>new blog  </button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm
            title={title}
            url={url}
            author={author}
            user = {props.user}
          />
          <button onClick={() => setAddVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return(
    <div className='blogList'>
      {createForm()}
      {props.blogsToShow.map(
        blog => <Blog
          key={blog.id}
          showFull ={false}
          id = {blog.id}
          currentUser = {props.user}
        />)}
    </div>
  )
}

const blogsToShow = ({ blogs }) => {
  return blogs.sort((a,b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogsToShow: blogsToShow(state)
  }
}

const mapDispatchToProps = {
  likeBlog,
  setNotification,
  deleteBlog
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
export default ConnectedAnecdotes