import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.18.222:3000', // Mudar para o IP do servidor
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
