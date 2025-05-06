import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateBR = (dateStr: string) => {
  const parsedDate = new Date(dateStr)
  return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR })
}

export const formatCurrency = (value: string) => {
  const formattedValue = value.replace(/[^\d]/g, '')
  if (!formattedValue) return ''

  const formattedNumber = Number(formattedValue) / 100
  return formattedNumber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const formatMoney = (value: string) => {
  const formattedValue = value.replace(/[^\d]/g, '')
  if (!formattedValue) return ''

  const integerPart = formattedValue.slice(0, -2)
  const decimalPart = formattedValue.slice(-2)

  const formattedString = `${integerPart ? integerPart : '0'}.${decimalPart}`

  return formattedString
}
