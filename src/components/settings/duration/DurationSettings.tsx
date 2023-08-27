import Sheet from '@mui/joy/Sheet';
import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
// import { Duration } from '../../../types/Duration';
// import PaceSettings from './PaceSettings';

function DurationSettings({
  // durations,
  // selectedDuration,
  // onDurationChange
}: {
  // durations: Duration[],
  // selectedDuration?: number,
  // onDurationChange: (duration: number) => void
}) {
  return (
    <Sheet>
      <Tabs defaultValue="pace">
        <TabList>
          <Tab value="pace">Pace</Tab>
          <Tab value="time-block">Time Block</Tab>
        </TabList>

        <TabPanel value="pace">
          {/* <PaceSettings
            durations={durations}
            selectedDuration={selectedDuration}
            onDurationChange={onDurationChange}
          /> */}
        </TabPanel>

        <TabPanel value="time-block">
          <h2>Time block</h2>
        </TabPanel>
      </Tabs>
    </Sheet>
  )
}

export default DurationSettings
