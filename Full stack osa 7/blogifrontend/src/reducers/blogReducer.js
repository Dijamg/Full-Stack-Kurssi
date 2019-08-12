import blogService from '../services/blogs'

export const initializeBlogs= () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = newObject => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(newObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }catch(exception){
      return exception.response.data.error
    }
  }
}

export const likeBlog = (newObject, id) => {
  return async dispatch => {
    const newBlog = await blogService.update(id, newObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    })
  }
}

export const commentBlog = (blog,text) => {
  return async dispatch => {
    const res = await blogService.comment(blog.id, text)
    blog.comments = blog.comments.concat(res)
    dispatch({
      type: 'COMMENT',
      data: blog
    })
  }
}

const blogReducer = (state =[], action) => {
  switch(action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map(a => a.id !== action.data.id ? a : action.data)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'COMMENT':
    return state.map(a => a.id !== action.data.id ? a : action.data)
  default:
    return state
  }
}

export default blogReducer