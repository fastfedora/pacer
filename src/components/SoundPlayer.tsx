import { useState } from 'react'
import Button from '@mui/joy/Button';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Stop from '@mui/icons-material/Stop';

function playSound(soundUrl: string) {
  const audio = new Audio(soundUrl)
  audio.play()
}

function SoundPlayer({
  delay,
  soundUrl,
  onNextNotificationTime
}: {
  delay: number,
  soundUrl: string,
  onNextNotificationTime: (nextTime: number | null) => void
}) {
  const [intervalId, setIntervalId] = useState<number | null>(null)

  const handlePlay = () => {
    onNextNotificationTime(Date.now() + delay)

    const newIntervalId = window.setInterval(() => {
      playSound(soundUrl);
      onNextNotificationTime(Date.now() + delay)
    }, delay)
    setIntervalId(newIntervalId)
  }

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
      onNextNotificationTime(null)
    }
  }

  return (
    <div>
      {intervalId
        ? <Button onClick={handleStop}><Stop /></Button>
        : <Button onClick={handlePlay}><PlayArrow /></Button>
      }
    </div>
  )
}

export default SoundPlayer