import { useState, useEffect } from 'react'

function Timer({ toTime }: { toTime?: number }) {
  const [remainingTime, setRemainingTime] = useState(toTime ? toTime - Date.now() : undefined);

  useEffect(() => {
    if (toTime) {
      const intervalId = setInterval(() => {
        setRemainingTime(toTime - Date.now())
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [toTime])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div style={{ fontSize: 60 }}>
      {remainingTime ? formatTime(remainingTime) : '00:00'}
    </div>
  )
}

export default Timer