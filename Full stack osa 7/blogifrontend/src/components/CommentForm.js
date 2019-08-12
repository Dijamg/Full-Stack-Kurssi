import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = (props) => {
  const txt = {
    id: 'comment',
    type: props.text.type,
    value: props.text.value,
    onChange: props.text.onChange
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = {
      text: props.text.value
    }
    if(props.text.value.length > 0){
      props.commentBlog(props.blog, comment)
      props.setNotification('Comment added!', 5, false)
    }
    props.text.reset()
  }

  return (
    <div className='commentForm'>
      <form onSubmit={handleSubmit} >
        <input {...txt} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}


export default connect(
  null,
  { commentBlog,
    setNotification
  }
)(CommentForm)