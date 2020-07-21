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
    await blogService.update(baseUrl, id, blog)
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

export const commentBlog = (id, blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.commentBlog(baseUrl, id, blog)
    dispatch({
      type: 'COMMENT',
      data: { id, newBlog }
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
    case 'COMMENT':
      const commentId = action.data.id
      const uncommentedBlog = state.find((blog) => blog.id === commentId)
      const commentedBlog = {
        ...uncommentedBlog,
        comments: action.data.newBlog.comments
      }
      return state.map((blog) => (blog.id !== commentId ? blog : commentedBlog))
    default:
      return state
  }
}

export default reducer
