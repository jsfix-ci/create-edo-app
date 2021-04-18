import fetch from 'node-fetch'
import ServerError from './ServerError.mjs'

const checkStatus = (response) => {
  if (response.ok) return response
  else throw new ServerError(response.statusText, response.status)
}

export const fetcher = async (...params) => {
  const response = await fetch(...params)
  checkStatus(response)

  return await response.json()
}

export default { fetcher }
