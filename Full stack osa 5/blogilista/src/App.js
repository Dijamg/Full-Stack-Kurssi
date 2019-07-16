import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'



const App =() => {
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const username = useField('text')
  const password = useField('password')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [addVisible, setAddVisible] = useState(false)

  const sortedArray = () => {
    return blogs.sort((a,b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value,
        user: user
      }
      const res = await blogService.create(blogObject)
      setBlogs(blogs.concat(res))
      title.reset()
      url.reset()
      author.reset()
      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }catch(exception){
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (id) => {
    try{
      const blog = blogs.find(n => n.id === id)
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user,
        likes: blog.likes + 1
      }
      const res = await blogService
        .update(blog.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : res ))
      setSuccessMessage(`You liked "${blog.title}" by ${blog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }catch(exception){
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(n => n.id === id)
    if(window.confirm(`Delete ${blog.title}?`)){
      try{
        await blogService
          .remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessMessage(
          `Deleted ${blog.title}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }catch(exception){
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      }
    }
  }

  const rows = () => sortedArray().map(
    blog => <Blog
      key={blog.id}
      handleLike={handleLike}
      handleDelete={handleDelete}
      blog = {blog}
      currentUser = {user}
    />)

  const loginForm = () => {

    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const createForm = () => {
    const hideWhenVisible = { display: addVisible ? 'none' : '' }
    const showWhenVisible = { display: addVisible ? '' : 'none' }
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddVisible(true)}>new blog  </button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm
            title={title}
            url={url}
            author={author}
            onSubmit = {addBlog}
          />
          <button onClick={() => setAddVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if(user === null){
    return(
      <div>
        <SuccessNotification message={successMessage}/>
        <ErrorNotification message={errorMessage}/>

        {loginForm()}
      </div>
    )
  }else{
    return(
      <div>
        <SuccessNotification message={successMessage}/>
        <ErrorNotification message={errorMessage}/>
        <h2>blogs</h2>

        <p>
          {user.name} logged in <button onClick ={() => logout()}>log out</button>
        </p>

        {createForm()}
        {rows()}
      </div>
    )
  }
}

export default App
