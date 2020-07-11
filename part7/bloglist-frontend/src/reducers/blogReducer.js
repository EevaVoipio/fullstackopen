import blogService from '../services/blogs'

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: anecdotes
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const updateId = action.data.id
      const initialBlog = state.find((blog) => blog.id === updateId)
      const updatedBlog = {
        ...initialBlog,
        likes: initialBlog.likes + 1
      }
      return state.map((blog) => (blog.id !== updateId ? blog : updatedBlog))
    case 'INIT_BLOGS':
      return action.data
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      const removeId = action.data.id
      return state.filter((blog) => blog.id !== removeId)
    default:
      return state
  }
}

export default reducer
