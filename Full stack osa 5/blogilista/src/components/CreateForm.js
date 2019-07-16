import React from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({
  onSubmit,
  title,
  url,
  author
}) => {
  title ={
    type: title.type,
    value: title.value,
    onChange: title.onChange
  }
  url ={
    type: url.type,
    value: url.value,
    onChange: url.onChange
  }
  author ={
    type: author.type,
    value: author.value,
    onChange: author.onChange
  }

  return (
    <form onSubmit={onSubmit} className='createForm'>
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
      <button type="submit">create</button>
    </form>

  )
}

CreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CreateForm