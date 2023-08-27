import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Duration } from '../../../types/Duration';


function PaceSettings({
  durations,
  timeBlocks,
  selectedDuration,
  selectedTimeBlock,
  onDurationChange,
  onTimeBlockChange
}: {
  durations: Duration[],
  timeBlocks: Duration[],
  selectedDuration?: number,
  selectedTimeBlock?: number,
  onDurationChange: (duration: number) => void
  onTimeBlockChange: (timeBlock: number | null) => void
}) {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Typography level="body-lg">Play a sound every</Typography>

        <ButtonGroup
          style={{ marginLeft: "auto", marginRight: "auto" }}
          variant="soft"
          spacing="0.5rem"
        >
          {durations.map((duration) => (
            <Button
              key={duration.duration}
              onClick={() => onDurationChange(duration.duration)}
              variant={duration.duration === selectedDuration ? 'solid' : undefined}
            >
              {duration.label}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

      <Stack spacing={2}>
        <Typography level="body-lg">Until this duration has elapsed</Typography>

        <ButtonGroup
          style={{ marginLeft: "auto", marginRight: "auto" }}
          variant="soft"
          spacing="0.5rem"
        >
          {timeBlocks.map((timeBlock) => (
            <Button
              key={timeBlock.duration}
              onClick={() => onTimeBlockChange(timeBlock.duration)}
              variant={timeBlock.duration === selectedTimeBlock ? 'solid' : undefined}
            >
              {timeBlock.label}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>
    </Stack>
  )
}

export default PaceSettings
