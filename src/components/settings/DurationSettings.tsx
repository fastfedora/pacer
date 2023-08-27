import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Duration } from '../../types/Duration';

export default function DurationSettings({
  durations,
  selectedDuration,
  onDurationChange,
}: {
  durations: Duration[],
  selectedDuration?: number,
  onDurationChange: (duration?: number) => void
}) {
  return (
    <Stack spacing={2}>
      <Typography level="body-lg">For the next</Typography>

      <ButtonGroup
        style={{ marginLeft: "auto", marginRight: "auto" }}
        variant="soft"
        spacing="0.5rem"
      >
        {durations.map((duration) => (
          <Button
            key={duration.seconds ?? 'infinite'}
            onClick={() => onDurationChange(duration.seconds)}
            variant={duration.seconds === selectedDuration ? 'solid' : undefined}
          >
            {duration.label}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
}
