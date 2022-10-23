
export default function convertHourtoHourString(hourString: number): string {
  const hour = Math.floor(hourString / 60)
  const minutes = hourString % 60;

  return `${String(hour).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`
}