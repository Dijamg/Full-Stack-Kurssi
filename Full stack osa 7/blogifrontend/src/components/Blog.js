import React from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Link, Redirect } from 'react-router-dom'
import  { useField } from '../hooks'
import CommentForm from './CommentForm'

const Blog = (props) => {
  const comment = useField('text')
  const blog = props.blogs.find(blog => blog.id === props.id)

  const handleLike =(id) => {
    try{
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user,
        likes: blog.likes + 1
      }
      props.likeBlog(blogObject, id)
      props.setNotification(`You liked "${blog.title}" by ${blog.author}`,5,false)
    }catch(exception){
      props.setNotification(exception.response.data.error,5,true)
    }
  }

  const handleDelete = async (id) => {
    if(window.confirm(`Delete ${blog.title}?`)){
      try{
        props.deleteBlog(id)
        props.setNotification(`Deleted ${blog.title}`,5,false)
      }catch(exception){
        props.setNotification(exception.response.data.error,5,true)

      }
    }
  }

  const deleteButton = (blog) => {
    const userId = (JSON.parse(atob(props.currentUser.token.split('.')[1]))).id //Extract id from token.
    const isCreator = userId === blog.user.id
    if(isCreator){
      return(<button onClick ={deleteBlog(blog)}>Remove</button>)
    }else{
      //Do nothing
    }
  }

  const likeBlog = (blog) => {
    return( () => handleLike(blog.id))
  }
  const deleteBlog = (blog) => {
    return( () => handleDelete(blog.id))
  }

  if(blog === undefined){
    return(<Redirect to='/' />)
  }

  const output = () => {
    if(props.showFull){
      return(
        <div>
          <div className ="info">
            <h2>{blog.title} by {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button onClick ={likeBlog(blog) }>like</button><br/>
            added by {blog.user.name}<br/>
            {deleteButton(blog)}
          </div>
          <div className='comments'>
            <h3>Comments</h3>
            <CommentForm blog ={blog} text = {comment} />
            <ul>
              {blog.comments.map((comment,i) => (
                <li key={i}>{comment}</li>     //Using index as key, because I didnt want to give id to comments. Order of comments wont change.
              )
              )}
            </ul>
          </div>
        </div>
      )
    }else{
      return( <div className='singleBlog'><Link data-cy='linkToBlog' to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>)
    }
  }

  return (
    <div>
      <div className='blog'>
        {output()}
      </div>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  setNotification,
  deleteBlog
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
export default ConnectedBlogs