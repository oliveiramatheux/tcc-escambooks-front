const differenceBetweenTwoDates = (date: Date) => {
  const postDate = date
  const now = new Date()
  const diffMilliseconds = Math.abs(Number(now) - Number(postDate))
  const diffHours = diffMilliseconds / 36e5
  const diffMinutes = diffMilliseconds / (60 * 1000)
  const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24))
  if (diffHours < 1) {
    if (diffMinutes < 1) {
      return 'Agora'
    }
    return `${Math.round(diffMinutes)} min`
  }
  if (diffHours > 23) {
    return `${Math.round(diffDays)} dias atrás`
  }
  return `${Math.round(diffHours)} h`
}

const calculateAge = (birthday: string) => {
  const date = birthday.split('/')
  const today = new Date()
  const birthDate = new Date(+date[2], +date[0], +date[1])
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export { differenceBetweenTwoDates, calculateAge }
