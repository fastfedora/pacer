import { useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Stop from '@mui/icons-material/Stop';
import { TimerInfo } from '../types/TimerInfo';

const defaultDelay = 15 * 60;
const soundCache: Record<string, Audio> = {};

const isPlaying = (audio: Audio) => (
  audio.currentTime > 0 && !audio.paused && !audio.ended &&
  audio.readyState > audio.HAVE_CURRENT_DATA
);

function playSound(soundUrl: string) {
  if (isPlaying(soundCache[soundUrl])) {
    soundCache[soundUrl].pause();
  }

  soundCache[soundUrl] = new Audio(soundUrl);
  soundCache[soundUrl].play();
}

function SoundPlayer({
  delay = defaultDelay,
  duration,
  soundUrl,
  onTimerInfoChanged,
}: {
  delay?: number,
  duration?: number,
  soundUrl: string,
  onTimerInfoChanged: (timerInfo: TimerInfo) => void,
}) {
  const [timerId, setTimerId] = useState<number | null>(null);
  const [timerInfo, setTimerInfo] = useState<TimerInfo>();

  useEffect(() => {
    if (!soundCache[soundUrl]) {
      soundCache[soundUrl] = new Audio(soundUrl);
    }
  }, [soundUrl]);

  const updateTimerInfo = (newTimerInfo: TimerInfo) => {
    setTimerInfo(newTimerInfo);
    onTimerInfoChanged(newTimerInfo);
  };

  const playNextTone = (currentTimerInfo: TimerInfo) => {
    const newTimerInfo = {
      ...currentTimerInfo,
      nextTime: Date.now() + delay * 1000,
      tonesPlayed: (currentTimerInfo.tonesPlayed ?? 0) + 1,
    };

    updateTimerInfo(newTimerInfo);
    playSound(soundUrl);

    // `nextTime` may be slightly ahead of `endTime`, so use a 1s buffer in the test
    if (!currentTimerInfo?.endTime || (newTimerInfo.nextTime - currentTimerInfo.endTime) < 1000) {
      setTimerId(window.setTimeout(playNextTone.bind(null, newTimerInfo), delay * 1000));
    } else {
      handleEnd(currentTimerInfo);
    }
  };

  const handlePlay = () => {
    const newTimerInfo = {
      startTime: Date.now(),
      // Add an extra minute to the start time so the user sees the total time
      // set first before it starts counting down.
      nextTime: Date.now() + delay * 1000 + 1000,
      endTime: duration ? Date.now() + duration * 1000 : undefined,
      tonesPlayed: 0,
      totalTones: duration ? Math.floor(duration / delay) : 0,
    };

    updateTimerInfo(newTimerInfo);
    setTimerId(window.setTimeout(playNextTone.bind(null, newTimerInfo), delay * 1000));
  }

  const handleEnd = (currentTimerInfo: TimerInfo) => {
    updateTimerInfo({
      ...currentTimerInfo,
      nextTime: undefined,
    });
  }

  const handleStop = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }

    if (isPlaying(soundCache[soundUrl])) {
      soundCache[soundUrl].pause();
    }

    if (timerInfo) {
      handleEnd(timerInfo);
    }
  }

  return (
    <div>
      {timerId
        ? <Button size="lg" onClick={handleStop}><Stop /></Button>
        : <Button size="lg" onClick={handlePlay}><PlayArrow /></Button>
      }
    </div>
  )
}

export default SoundPlayer