import api from './api'

export async function sendMessageToAI(message: string): Promise<string> {
  try {
    const response = await api.post('/chat', { message })
    return response.data.response
  } catch (error) {
    console.error('Erro ao chamar a API de chat:', error)
    throw new Error('Falha na comunicação com a IA.')
  }
}
