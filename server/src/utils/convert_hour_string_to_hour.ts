
export function convertHourStringToHour(hourString: String){
  const [hour,minutes] = hourString.split(":").map(Number)

  const newHour = (hour*60)+minutes

  return newHour
}