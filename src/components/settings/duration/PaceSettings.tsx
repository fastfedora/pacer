import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pace } from '../../../types/Pace';

export default function PaceSettings({
  paces,
  selectedPace,
  onPaceChange,
}: {
  paces: Pace[],
  selectedPace?: number,
  onPaceChange: (duration?: number) => void
}) {
  return (
    <Stack spacing={2}>
      <Typography level="body-lg">Play a sound every</Typography>

      <ButtonGroup
        style={{ marginLeft: "auto", marginRight: "auto" }}
        variant="soft"
        spacing="0.5rem"
      >
        {paces.map((duration) => (
          <Button
            key={duration.seconds}
            onClick={() => onPaceChange(duration.seconds)}
            variant={duration.seconds === selectedPace ? 'solid' : undefined}
          >
            {duration.label}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
}
