import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {

  const[showFull, setShowFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeStyle ={
    backgroundColor: 'grey'
  }

  const deleteButton = (blog) => {
    const userId = (JSON.parse(atob(currentUser.token.split('.')[1]))).id //Extract id from token.
    //After a like/addition new blog's user field consist of user id only. After refresh it consists of username,name and id.
    const isCreator = blog.user.id ? (userId === blog.user.id) : (userId === blog.user)
    if(isCreator){
      return(<button style={removeStyle} onClick ={deleteBlog(blog)}>Remove</button>)
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

  const output = () => {
    if(showFull){
      // When a blog is added, first user field consists only of user id until page is refreshed.
      // In those cases where blog has just been added, we take name from current user, since only he could have added.
      const adder = blog.user.name ? blog.user.name : currentUser.name
      return(
        <div className ="info">
          {blog.title} {blog.author}<br/>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <button onClick ={likeBlog(blog) }>like</button><br/>
          added by {adder}<br/>
          {deleteButton(blog)}
        </div>
      )
    }else{
      return( <>{blog.title} {blog.author}</>)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowFull(!showFull)}  className='blog'>
        {output()}
      </div>
    </div>
  )}

export default Blog