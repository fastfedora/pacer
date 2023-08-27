import { useState } from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Header from './components/app/Header';
import Instructions from './components/app/Instructions';
import DurationSettings from './components/settings/DurationSettings';
import PaceSettings from './components/settings/PaceSettings';
import ToneSettings from './components/settings/ToneSettings';
import Accordion from './components/styled/Accordion';
import SoundPlayer from './components/SoundPlayer'
import Timer from './components/Timer';
import { TimerInfo } from './types/TimerInfo';
import { ToneInfo } from './types/ToneInfo';
import './App.css'

/**
 * TODO:
 * - Add embedded mode without settings, only the timer
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
  // { label: '1 min', seconds: 1 * 60, defaultPace: 15, },
  { label: '15 min', seconds: 15 * 60, defaultPace: 5 * 60, },
  { label: '30 min', seconds: 30 * 60, defaultPace: 10 * 60, },
  { label: '45 min', seconds: 45 * 60, defaultPace: 15 * 60, },
  { label: '60 min', seconds: 60 * 60, defaultPace: 20 * 60, },
  { label: '90 min', seconds: 90 * 60, defaultPace: 30 * 60, },
  { label: '120 min', seconds: 120 * 60, defaultPace: 30 * 60, },
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
  const [timerInfo, setTimerInfo] = useState<TimerInfo>();
  const [isSettingsExpanded, setSettingsExpanded] = useState<boolean>(true);

  return (
    <Stack style={{ width: 700 }}>
      <Header />

      <AccordionGroup>
        <Accordion label="Instructions">
          <Instructions />
        </Accordion>

        <Accordion label="Settings" expanded={isSettingsExpanded} onChange={setSettingsExpanded}>
          <Stack spacing={6} sx={{ p: 2 }}>
            <DurationSettings
              durations={durations}
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
              onPaceChange={setSelectedPace}
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
      </AccordionGroup>

      <Sheet>
        <Stack sx={{ pt: 6, pb: 8 }} spacing={4}>
          <SoundPlayer
            delay={selectedPace}
            duration={selectedDuration}
            soundUrl={`/sounds/${tones[selectedTone].file}`}
            onTimerInfoChanged={(newTimerInfo) => {
              setSettingsExpanded(newTimerInfo.nextTime == null);
              setTimerInfo(newTimerInfo);
            }}
          />

          {timerInfo &&
            <Timer timerInfo={timerInfo} />
          }
        </Stack>
      </Sheet>

      <Sheet component="footer" variant="solid" sx={{ p: 2, background: '#444' }}>
        A mini-app provided by <a target="_blank" href="https://dayoptimizer.com/">Day Optimizer</a>
      </Sheet>
    </Stack>
  );
}

export default App
