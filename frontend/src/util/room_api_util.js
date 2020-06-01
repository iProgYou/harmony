import axios from 'axios';

export const fetchRooms = () => {
  return axios.get('/api/rooms/')
}

export const fetchRoom = roomName =>{
  return axios.get(`/api/rooms/${roomName}`)
}

export const createRoom = (roomData) => {
  return axios.post('/api/rooms/', roomData)
}

export const updateRoom = (roomData) => {
  return axios.patch(`/api/rooms/${roomData.roomId}`, roomData)
}

export const deleteRoom = (roomData) => {
  return axios.delete(`/api/rooms/${roomData.roomId}`, roomData)
}