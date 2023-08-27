import { useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Stop from '@mui/icons-material/Stop';

const defaultDelay = 15 * 60;
const soundCache: Record<string, Audio> = {};

function SoundPlayer({
  delay = defaultDelay,
  duration,
  soundUrl,
  onNextNotificationTime
}: {
  delay?: number,
  duration?: number,
  soundUrl: string,
  onNextNotificationTime: (nextTime: number | undefined) => void
}) {
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [stopTimerId, setStopTimerId] = useState<number | null>(null)

  useEffect(() => {
    if (!soundCache[soundUrl]) {
      soundCache[soundUrl] = new Audio(soundUrl);
    }
  }, [soundUrl])

  const handlePlay = () => {
    // Add an extra minute to the start time so the user sees the total time
    // set first before it starts counting down.
    onNextNotificationTime(Date.now() + (delay * 1000 + 1000));

    const newIntervalId = window.setInterval(() => {
      onNextNotificationTime(Date.now() + delay * 1000)
      soundCache[soundUrl].play();
    }, delay * 1000);

    setIntervalId(newIntervalId);

    if (duration) {
      const newStopTimerId = window.setTimeout(() => handleStop(), duration * 1000);

      setStopTimerId(newStopTimerId);
    }
  }

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId)

      if (stopTimerId) {
        clearTimeout(stopTimerId);
      }

      soundCache[soundUrl].pause();

      setIntervalId(null);
      setStopTimerId(null);

      onNextNotificationTime(undefined);
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