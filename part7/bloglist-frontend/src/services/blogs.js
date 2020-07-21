import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (baseUrl) => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (baseUrl, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (baseUrl, id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const deleteBlog = async (baseUrl, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

const commentBlog = async (baseUrl, id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
  const response = await request
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog, commentBlog }
