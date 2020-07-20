import blogService from '../services/blogs'
const baseUrl = '/api/blogs'

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(baseUrl, blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(baseUrl, id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(baseUrl)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(baseUrl, id)
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
    case 'LIKE': {
      const updateId = action.data.id
      const initialBlog = state.find((blog) => blog.id === updateId)
      const updatedBlog = {
        ...initialBlog,
        likes: initialBlog.likes + 1
      }
      return state.map((blog) => (blog.id !== updateId ? blog : updatedBlog))
    }
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
