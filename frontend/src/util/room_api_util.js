import axios from 'axios';

export const fetchRooms = () => {
  return axios.get('/api/rooms/')
}

export const createRoom = (roomData) => {
  return axios.post('/api/rooms/', roomData)
}