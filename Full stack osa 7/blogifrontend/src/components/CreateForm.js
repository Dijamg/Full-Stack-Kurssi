import React from 'react'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const CreateForm = (props) => {
  const title ={
    id: 'title',
    type: props.title.type,
    value: props.title.value,
    onChange: props.title.onChange
  }
  const url ={
    id: 'url',
    type: props.url.type,
    value: props.url.value,
    onChange: props.url.onChange
  }
  const author ={
    id: 'author',
    type: props.author.type,
    value: props.author.value,
    onChange: props.author.onChange
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: props.title.value,
      author: props.author.value,
      url: props.url.value,
      user: props.user
    }
    const res = props.addBlog(blogObject)
    // Check if adding a blog throwed an exception, if yes set notification.
    res.then(exception => {
      if(exception){
        props.setNotification(exception,5,true)
      }else{
        props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author}`,5,false)
      }
    })
    props.title.reset()
    props.url.reset()
    props.author.reset()
  }

  return (
    <form onSubmit={createBlog} className='createForm'>
      <div>
        <h1>create new</h1>
        title:
        <input {...title}/>
      </div>
      <div>
        author:
        <input {...author}/>
      </div>
      <div>
        url:
        <input {...url}/>
      </div>
      <button data-cy='create' type="submit">create</button>
    </form>

  )
}


export default connect(
  null,
  { addBlog,
    setNotification
  }
)(CreateForm)

