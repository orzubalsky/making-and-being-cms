import axios from 'axios'
import { DATO_API_TOKEN } from './keys'

const API_URL = `https://graphql.datocms.com/`

const fetchContent = query => {
  const data = JSON.stringify({ query })

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${DATO_API_TOKEN}`
  }

  return axios.post(API_URL, data, { headers })
}

export const fetchChapters = () => {
  const fields = 'name, content, position, isActive'
  const media = 'media { url, title }'
  const video = `video { id, ${fields}, ${media} }`
  const podcast = `podcast { id, ${fields}, ${media} }`
  const activities = `activities { id, ${fields}, ${media} }`
  const assignments = `assignments { id, ${fields}, ${media} }`
  const events = `events { id, ${fields}, time, location { longitude, latitude } }`
  return fetchContent(`{ allChapters { id, ${fields}, ${media}, ${video}, ${podcast}, ${activities}, ${assignments}, ${events} } }`)
}
