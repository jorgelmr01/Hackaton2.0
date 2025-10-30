const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('es-MX')

export function formatCurrency(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount || 0)
  return currencyFormatter.format(num)
}

export function formatNumber(num) {
  const n = typeof num === 'number' ? num : parseFloat(num || 0)
  return numberFormatter.format(n)
}

export function formatDate(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike)
  return new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'short', day: '2-digit' }).format(d)
}

export function formatCurrency0(amount) {
  const nf = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const num = typeof amount === 'number' ? amount : parseFloat(amount || 0)
  return nf.format(num)
}


