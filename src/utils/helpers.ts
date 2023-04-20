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

export { differenceBetweenTwoDates }
