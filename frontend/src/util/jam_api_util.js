import axios from 'axios';

export const fetchJams = () => {
  return axios.get('/api/jams/')
}

export const createJams = (jamData) => {
  return axios.post('/api/jams/', jamData)
}