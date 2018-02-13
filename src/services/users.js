import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

/* const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const wholeUrl = `${baseUrl}/${id}`
  const response = await axios.delete(wholeUrl, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const wholeUrl = `${baseUrl}/${id}`
  const response = await axios.put(wholeUrl, newObject, config)
  return response.data
 */

export default { getAll, setToken}