import { useState } from 'react'
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
// import DurationSettings from './components/settings/duration/DurationSettings';
import PaceSettings from './components/settings/duration/PaceSettings';
import SoundPlayer from './components/SoundPlayer'
import Timer from './components/Timer';
import './App.css'


/**
 * TODO:
 * - Stop the sound when the Stop button is pressed
 */


const durations = [
  { label: '0.5 min', duration: 0.5 * 60 * 1000 },
  { label: '5 min', duration: 5 * 60 * 1000 },
  { label: '10 min', duration: 10 * 60 * 1000 },
  { label: '15 min', duration: 15 * 60 * 1000 },
  { label: '30 min', duration: 30 * 60 * 1000 },
];

const timeBlocks = [
  { label: 'Never', duration: undefined },
  { label: '15 min', duration: 15 * 60 * 1000 },
  { label: '30 min', duration: 30 * 60 * 1000 },
  { label: '45 min', duration: 45 * 60 * 1000 },
  { label: '60 min', duration: 60 * 60 * 1000 },
  { label: '90 min', duration: 90 * 60 * 1000 },
  { label: '120 min', duration: 120 * 60 * 1000 },
];

const tones = [
  { label: 'Ocean Waves', file: '530996-surrogatemedia-the-ocean-waves.wav' },
  { label: 'Altar Chimes', file: '556779-launchsite-altar-chimesringtone.wav' },
];

function App() {
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(durations[0].duration);
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<number | undefined>(timeBlocks[0].duration);
  const [nextNotificationTime, setNextNotificationTime] = useState<number | null>(null);

  return (
    <Stack style={{ width: 600 }} spacing={8}>
      <Header />

      <PaceSettings
        durations={durations}
        timeBlocks={timeBlocks}
        selectedDuration={selectedDuration}
        selectedTimeBlock={selectedTimeBlock}
        onDurationChange={setSelectedDuration}
        onTimeBlockChange={setSelectedTimeBlock}
      />

      {nextNotificationTime &&
        <Sheet>
          <Timer toTime={nextNotificationTime} />
        </Sheet>
      }

      <Sheet>
        <SoundPlayer
          delay={selectedDuration}
          soundUrl={`/sounds/${tones[0].file}`}
          onNextNotificationTime={setNextNotificationTime}
        />
      </Sheet>

      {false &&
        <Sheet>
          <Typography level="title-lg">Debug</Typography>

          <div>Selected duration: {(selectedDuration ?? 0) / 1000 / 60} min</div>
          <div>Next notification time:
            {nextNotificationTime} -
            {nextNotificationTime ? new Date(nextNotificationTime!).toLocaleTimeString() : 'null'}
          </div>
        </Sheet>
      }
    </Stack>
  )
}

export default App
