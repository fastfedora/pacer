import { useState, useEffect } from 'react'
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { TimerInfo } from '../types/TimerInfo';

function Timer({ timerInfo }: { timerInfo?: TimerInfo }) {
  const [remainingTime, setRemainingTime] = useState(
    timerInfo?.nextTime ? timerInfo.nextTime - Date.now() : undefined
  );

  const timeUntilEnd = timerInfo?.endTime ? Math.max(0, timerInfo.endTime - Date.now()) : undefined;

  useEffect(() => {
    if (timerInfo?.nextTime) {
      setRemainingTime(timerInfo.nextTime - Date.now());

      const intervalId = setInterval(() => {
        if (timerInfo.nextTime) {
          setRemainingTime(timerInfo.nextTime - Date.now())
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [timerInfo?.nextTime])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Stack style={{ fontSize: 72, paddingTop: 36 }} spacing={4}>
      <Stack direction={['column', 'row']} justifyContent="space-evenly" spacing={[8, 8]}>
        <div>
          <Typography level="title-lg">Next tone in</Typography>
          {remainingTime ? formatTime(remainingTime) : '00:00'}
        </div>

        <div>
          <Typography level="title-lg">Remaining total time</Typography>
          {timeUntilEnd ? formatTime(timeUntilEnd) : '00:00'}
        </div>
      </Stack>

      <div>
        <Typography level="title-lg">
          Sprint {timerInfo?.totalTones
            ? (timerInfo?.tonesPlayed ?? 0) + 1
            : '--'
          } of {timerInfo?.totalTones ?? '--'}
        </Typography>
      </div>
    </Stack>
  )
}

export default Timer