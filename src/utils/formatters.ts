const formatPhoneNumber = (phoneNumber: string) => {
  const match = phoneNumber.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }

  return phoneNumber
}

export { formatPhoneNumber }
