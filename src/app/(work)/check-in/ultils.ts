export const calculateCheckInTime = (time: [string, string]) => {
  if (!time[1]) {
    return +0
  }

  const [startHour, startMinute] = time[0].split(':')
  const [endHour, endMinute] = time[1].split(':')

  const startTime = Number(startHour) * 60 + Number(startMinute)
  const endTime = Number(endHour) * 60 + Number(endMinute)

  if (Number(startHour) > 12 || Number(endHour) < 12) {
    return ((endTime - startTime) / 60).toFixed(3)
  }

  return ((endTime - startTime) / 60 - 1.5).toFixed(3)
}

export const calculateWorkTime = (time: any[]) => {
  const total = time
    .map((d: any) =>
      d[1]?.checkInValue.reduce(
        (initValue: number, current: [string, string]) => {
          return initValue + +(current?.[1] ? calculateCheckInTime(current) : 0)
        },
        0,
      ),
    )
    .reduce((i: number, c: number) => {
      const t = Number((+c / 7.5).toFixed(3))

      return i + Number(t)
    }, 0)

  return Number(total.toFixed(3))
}
