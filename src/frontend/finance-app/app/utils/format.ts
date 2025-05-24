import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDateBR = (dateStr: string) => {
  const parsedDate = new Date(dateStr)
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR })
}

export const formatCurrency = (
  value: string | number | undefined | null,
): string => {
  if (!value) return "R$ 0,00"

  const numericValue =
    typeof value === "string" ? value.replace(/[^\d]/g, "") : String(value)
  const float = parseFloat(numericValue) / 100

  return float.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export const formatCPF = (value: string) => {
  const numericValue = value.replace(/\D/g, "").slice(0, 11)
  return numericValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export function unformatCPF(value: string) {
  return value.replace(/\D/g, "")
}

export const formatMoney = (value: string) => {
  const formattedValue = value.replace(/[^\d]/g, "")
  if (!formattedValue) return ""

  const integerPart = formattedValue.slice(0, -2)
  const decimalPart = formattedValue.slice(-2)

  const formattedString = `${integerPart ? integerPart : "0"}.${decimalPart}`

  return formattedString
}

export const formatNumberBR = (value: number) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
