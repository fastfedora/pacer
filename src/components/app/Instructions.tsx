import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Typography level="body-md" gutterBottom={true} sx={{ mb: 2 }}>
    {children}
  </Typography>
);

export default function Instructions() {
  return (
    <Sheet sx={{ textAlign: "left" }}>
      <Paragraph>
        Pacer is a pacing timer that creates awareness of time passing by
        playing a gentle tone at a regular interval. Watch <a
          href="https://www.youtube.com/watch?v=_w-RBBd4j60&t=1s"
          target="_blank"
        >this video</a> to learn more about pacers.
      </Paragraph>

      <Paragraph>
        Use Pacer to avoid spending more time than you intend on a task or to
          adjust your approach if a task is taking longer than you projected.
      </Paragraph>

      <Paragraph>
        To use Pacer, simply select a duration you want the timer to run for and
        a frequency with which to play the tone.
      </Paragraph>
    </Sheet>
  );
}
