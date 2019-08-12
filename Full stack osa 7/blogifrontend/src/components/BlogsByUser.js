import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const BlogsByUser = ({ id }) => {
  const [user, setUser] = useState()
  const [blogs, setBlogs] = useState([])
  const [loaded, setLoaded] = useState(false) // Checks if all information is fetch before returning.

  useEffect(() => {
    userService
      .getAll()
      .then(data => {
        setUser(data.find(user => user.id === id))
      })
  }, [])

  if(user && !loaded){
    setBlogs(blogs.concat(user.blogs))
    setLoaded(true)
  }

  if(loaded){
    return(
      <div className='user'>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }else{
    return(<div></div>)
  }
}

export default BlogsByUser