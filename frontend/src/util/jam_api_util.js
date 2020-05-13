import axios from 'axios';

export const fetchJams = () => {
  return axios.get('/api/jams/')
}