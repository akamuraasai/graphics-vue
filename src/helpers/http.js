import axios from 'axios'

export const get = url => (
  axios.get(url)
    .then(response => response.data)
    .catch(error => console.error(`${error.code}: ${error.message}`))
)

export const post = (url, data) => (
  axios.post(url, data)
    .then(response => response.data)
    .catch(error => console.error(`${error.code}: ${error.message}`))
)

export const put = (url, id, data) => (
  axios.put(`${url}/${id}`, data)
    .then(response => response.data)
    .catch(error => console.error(`${error.code}: ${error.message}`))
)

export const remove = (url, id) => (
  axios.delete(`${url}/${id}`)
    .then(response => response.data)
    .catch(error => console.error(`${error.code}: ${error.message}`))
)
