import { useState } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Header from './components/app/Header';
import Instructions from './components/app/Instructions';
import DurationSettings from './components/settings/DurationSettings';
import PaceSettings from './components/settings/PaceSettings';
import ToneSettings from './components/settings/ToneSettings';
import Accordion from './components/styled/Accordion';
import SoundPlayer from './components/SoundPlayer'
import Timer from './components/Timer';
import { ToneInfo } from './types/ToneInfo';
import './App.css'

/**
 * TODO:
 * - Stop the sound when the Stop button is pressed
 */

const paces = [
  // { label: '15 sec', seconds: 15 },
  { label: '5 min', seconds: 5 * 60 },
  { label: '10 min', seconds: 10 * 60 },
  { label: '15 min', seconds: 15 * 60 },
  { label: '20 min', seconds: 20 * 60 },
  { label: '30 min', seconds: 30 * 60 },
];

const durations = [
  { label: '15 min', seconds: 15 * 60 },
  { label: '30 min', seconds: 30 * 60 },
  { label: '45 min', seconds: 45 * 60 },
  { label: '60 min', seconds: 60 * 60 },
  { label: '90 min', seconds: 90 * 60 },
  { label: '120 min', seconds: 120 * 60 },
  { label: 'Indefinitely', seconds: undefined },
];

const tones: Record<string, ToneInfo> = {
  'gamelan-gong': {
    label: 'Gamelan Gong',
    file: '411090-inspectorj-wind-chime-gamelan-gong-a.wav',
    // TODO: Add links, as seen here: https://freesound.org/people/InspectorJ/sounds/411090/
    credit: '"Wind Chime, Gamelan Gong, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org',
  },
  'ocean-waves': {
    label: 'Ocean Waves',
    file: '530996-surrogatemedia-the-ocean-waves.wav'
  },
  'altar-chimes': {
    label: 'Altar Chimes',
    file: '556779-launchsite-altar-chimesringtone.wav'
  },
  'seagull': {
    label: 'Seagull',
    file: '699979-henner1964-seagull.mp3',
  },
  'bird-chirp': {
    label: 'Bird Chirping',
    file: '519108-matrixxx-bird-07.wav',
  },
};

function App() {
  const [selectedPace, setSelectedPace] = useState<number | undefined>(paces[0].seconds);
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(durations[0].seconds);
  const [selectedTone, setSelectedTone] = useState<string>(Object.keys(tones)[0]);
  const [nextNotificationTime, setNextNotificationTime] = useState<number | undefined>();

  return (
    <Stack style={{ width: 700 }} spacing={0}>
      <Header />

      <AccordionGroup>
        <Accordion label="Instructions">
          <Instructions />
        </Accordion>

        <Accordion label="Settings" defaultExpanded={true}>
          <Stack spacing={6} sx={{ p: 2 }}>
            <DurationSettings
              durations={durations}
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
            />

            <PaceSettings
              paces={paces}
              selectedPace={selectedPace}
              onPaceChange={setSelectedPace}
            />

            <ToneSettings
              tones={tones}
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
            />
          </Stack>
        </Accordion>

        <Accordion label="Timer" defaultExpanded={true}>
          <Sheet>
            <Timer toTime={nextNotificationTime} />
          </Sheet>
        </Accordion>
      </AccordionGroup>

      <Sheet sx={{ p: 4, pb: 8 }}>
        <SoundPlayer
          delay={selectedPace}
          soundUrl={`/sounds/${tones[selectedTone].file}`}
          onNextNotificationTime={setNextNotificationTime}
        />
      </Sheet>

      {false &&
        <Sheet>
          <Typography level="title-lg">Debug</Typography>

          <div>Selected duration: {(selectedPace ?? 0) / 60} min</div>
          <div>Next notification time:
            {nextNotificationTime} -
            {nextNotificationTime ? new Date(nextNotificationTime!).toLocaleTimeString() : 'null'}
          </div>
        </Sheet>
      }
    </Stack>
  );
}

export default App
