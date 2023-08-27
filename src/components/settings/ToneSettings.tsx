import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ToneInfo } from '../../types/ToneInfo';

export default function ToneSettings({
  tones,
  selectedTone,
  onToneChange,
}: {
  tones: Record<string, ToneInfo>,
  selectedTone: string,
  onToneChange: (toneId: string) => void
}) {
  return (
    <Stack spacing={2}>
      <Typography level="body-lg">By playing</Typography>

      <ButtonGroup
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
        variant="soft"
        spacing="0.5rem"
      >
        {Object.keys(tones).map((id) => (
          <Button
            key={id}
            onClick={() => onToneChange(id)}
            variant={id === selectedTone ? 'solid' : undefined}
          >
            {tones[id].label}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
}
