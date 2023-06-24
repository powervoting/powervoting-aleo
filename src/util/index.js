export const formatDollar = value => {
    const v = Number(value)
    if (Number.isNaN(v)) {
      return value
    } else {
      return Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'USD',
        // maximumSignificantDigits: 3,
        notation: 'standard'
      }).format(v)
    }
  }