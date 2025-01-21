export const calculateCheckInTime = (time: string[]) => {
  const [startHour, startMinute] = time[0].split(':')
  const [endHour, endMinute] = time[1].split(':')

  const startTime = Number(startHour) * 60 + Number(startMinute)
  const endTime = Number(endHour) * 60 + Number(endMinute)

  if (Number(startHour) > 12) {
    return ((endTime - startTime) / 60).toFixed(1)
  }

  return ((endTime - startTime) / 60 - 1.5).toFixed(1)
}

export const formatDecimal = (number: number) => {
  if (isNaN(number)) return number

  const rounded = Math.round(number * 10) / 10
  return rounded % 1 === 0
    ? rounded.toString().split('.')[0]
    : rounded.toString()
}
