import axios from 'axios'

const api = axios.create({
  baseURL: '', // Mudar para o IP do servidor
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
